import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"; 

export const verifyJWT= asyncHandler(async(req,res,next)=>{

    try {
        //well i am using header only and cookies but this works perfectly fine for both
        const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")//here we are removing breaere keyword with space to get only token
        if(!token){
            throw new ApiError(401,"Unauthorised request")
        }

        //  jwt.verify does 3 things:
        //   1. Confirms the token is valid (was signed using your secret key).
        //   2. Confirms the token is not expired.
        //   3. Decodes it to get the data inside.
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET) // decoding the token

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
        req.user=user
        next()

    } 
    catch (error) {
        throw new ApiError(401,"Invalid Access Token")
    }

})