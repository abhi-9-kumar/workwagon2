import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a valid name"],
        minlength:[3,"Name must be at least 3 characters long"],
        maxlength:[30,"Name must not exceed 30 characters"],
    },
    email:{
        type:String,
        required:[true,"Please provide a valid email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"Invalid email format"],
    },
    coverLetter:{
        type:String,
        required:[true, "Please provide a cover letter"],
        minlength:[50,"Cover letter must be at least 50 characters long"],
        maxlength:[500,"Cover letter must not exceed 500 characters"],
    },
    phone:{
        type:Number,
        required:[true,"Please provide a valid phone number"],
        unique:true,
        minlength:[10,"Phone number must be at least 10 digits long"],
        maxlength:[15,"Phone number must not exceed 15 digits"],
    },
    address:{
        type:String,
        required:[true, "Please provide a valid address"],
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }
});

export const Application=mongoose.model("Application",applicationSchema);