import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"Name Required"]
    },
    email:{
        type:String,
        required:[true,"email Required"]
    },
    phone:{
        type:String,
        required:[true,"phone number Required"]
    },
    aboutMe:{
        type:String,
        required:[true,"aboutMe Field is Required"]
    },
    password:{
        type:String,
        required:[true,"Password is Required"],
        minLength:[8,"Password must contain at least 8 character"],
        select: false,
    },
    avatar:{
       public_id:{
        type: String,
        required: true
       },
       url:{
        type: String,
        required: true
       }
    },
    resume:{
       public_id:{
        type: String,
        required: true
       },
       url:{
        type: String,
        required: true
       }
    },
    portfolioURL:{
        type: String,
    },
    githubURL:{
        type: String,
    },
    instagramURL: String,
    facebookURL: String,
    twitterURL: String,
    linkedInURL: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

})

userSchema.methods.comparePasswords = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};
userSchema.methods.generateJsonWebToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRATE_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
};



export const User = mongoose.model("User",userSchema);