import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js" 
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


//function for generateAccess And RefreshTokens
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found while generating tokens");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Token generation error:", error);
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
    }
};


//SIGNUP USER
const registerUser = asyncHandler(async(req,res)=>{

    const {fullname,email,username,password} = req.body

    if(fullname===""){
        throw new ApiError(400,"fullName is required");
    }
    if(email===""){
        throw new ApiError(400,"email is required");
    }
    if(username===""){
        throw new ApiError(400,"username is required");
    }
    if(password===""){
        throw new ApiError(400,"password is required");
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with this username or email already exists");
        // return next(new ApiError(409, "User with this username or email already exists"));
    }

    const user = await User.create({
        fullname,
        email,
        password,
        username:username.toLowerCase()
    })

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user") 
    }

    return res.status(201).json(
        new ApiResponse(201, {
            user: createdUser,
            accessToken,
            refreshToken
        }, "User registered successfully")
    );

})

//LOGIN USER
const loginUser = asyncHandler(async(req,res)=>{
    const {username , password} = req.body
    if (!username || !password) {
        throw new ApiError(400, "Username and Password are required");
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
        throw new ApiError(404, "User not found with this username");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedIn = await User.findById(user._id).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, {
            user: loggedIn,
            accessToken,
            refreshToken
        }, "User logged in successfully")
    );

})

 
//I am using JSON tokens and not cookie-based auth.
//logoutUser only needs to clear the refresh token from DB. 
//LOGOUT USER 
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshToken: undefined } },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, {}, "User logged out successfully")
    );
});


// REFRESH ACCESS TOKEN
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh Token is required");
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        const user = await User.findById(decoded._id);

        if (!user || user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Invalid Refresh Token");
        }

        const accessToken = user.generateAccessToken();

        return res.status(200).json(
            new ApiResponse(200, { accessToken }, "New access token generated")
        );
    } 
    catch (error) {
        throw new ApiError(401, "Invalid or Expired Refresh Token");
    }
});




export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
}