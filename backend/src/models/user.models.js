import mongoose , {Schema} from "mongoose"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 2,
    },
    fullname:{
        type: String,
        required:true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String,
        default: null,
    }

}, { timestamps: true });

//hashing
userSchema.pre("save",async function(next){
    if(! this.isModified("password"))return next();
    this.password= await bcrypt.hash(this.password,10);//10 rounds of hashing
    next();
})

//making custom method to compare the password beacuse i know that bcrypt can also checek passwowrd
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)//comapring password to encrypted one
}

//generate Access and refresh token structure
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {   
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {   
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);

