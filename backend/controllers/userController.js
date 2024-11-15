import {User} from "../models/userSchema.js"
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"
import {v2 as cloudinary} from "cloudinary"
import { generateToken } from "../utils/jwtToken.js"

export const register = catchAsyncErrors(async(req,res,next)=>{
        if(!req.files || Object.keys(req.files).length === 0){
            return next(new ErrorHandler("Avatar and Resume are Required",400))
        }
        const {avatar} = req.files;

        const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {folder:"AVATARS"}
        );
        if(!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error){
            console.error("Cloudinary Error", 
                cloudinaryResponseForAvatar.error || "Unknown Cloudinary Error"
            )
        }

        const {resume} = req.files;
        const cloudinaryResponseForResume = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {folder:"MY_RESUME"}
        );
        if(!cloudinaryResponseForResume || cloudinaryResponseForResume.error){
            console.error("Cloudinary Error", 
                cloudinaryResponseForResume.error || "Unknown Cloudinary Error"
            )
        }

        const {fullName,
        email,
        phone,
        aboutMe,
        password,
        portfolioURL,
        githubURL,
        instagramURL,
        facebookURL,
        twitterURL,
        linkedInURL} = req.body;

        const user = await User.create({fullName,
            email,
            phone,
            aboutMe,
            password,
            portfolioURL,
            githubURL,
            instagramURL,
            facebookURL,
            twitterURL,
            linkedInURL,
            avatar:{
                public_id:cloudinaryResponseForAvatar.public_id,
                url:cloudinaryResponseForAvatar.secure_url,
            },
            resume:{
                public_id:cloudinaryResponseForResume.public_id,
                url:cloudinaryResponseForResume.secure_url,
            }})

        // res.status(200).json({
        //     success:true,
        //     message:"User Registered"
        // })
        generateToken(user,"User Register", 201, res);
})

export const login = catchAsyncErrors(async(req,res,next)=>{
        const {email,password} = req.body;
        if(!email || !password){
            return next(new ErrorHandler("Email and Password are Required"))
        }
        const user = User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("Invalid Email Or Password"));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid Email Or Password"));
        }
        generateToken(user,"Logged In",200,res);
})