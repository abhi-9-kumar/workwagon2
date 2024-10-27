import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minlength:[3,"Name must be at least 3 characters long"],
        maxlength:[30,"Name must not exceed 30 characters"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Invalid email format"],
    },
    phone:{
        type:Number,
        required:[true,"Phone number is required"],
        unique:true,
        minlength:[10,"Phone number must be at least 10 digits long"],
        maxlength:[15,"Phone number must not exceed 15 digits"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[8,"Password must be at least 8 characters long"],
        select:false,
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["Job Seeker","Employer"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    document:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    profilePicture:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }

});


// hasing the password

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});


//Comparing password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

//Generating JWT token for autherisation
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE,});
};

export const User=mongoose.model("User",userSchema);
