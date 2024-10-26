import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import {User} from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";


export const register=catchAsyncError(async(req,res,next) => {
    const{name,email,phone,role,password} =req.body;
    if(!name || !email || !phone || !role || !password)
    {
        return next(new ErrorHandler("Please enter all details"));   
    }
    const isEmail=await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("Email already exists"));
    }

    const user = await User.create({name,email,phone,role,password});
    sendToken(user,200,res,"User registered successfully");
});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return next(new ErrorHandler("Please provide email ,password and role.",400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }
    if (user.role !== role) {
      return next(
        new ErrorHandler(`User with provided email and ${role} not found!`, 404)
      );
    }
    sendToken(user, 200, res, "User Logged In Successfully!");
  });
  

  export const logout = catchAsyncError(async (req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        secure:true,
        sameSite:"None",
      })
      .json({
        success: true,
        message: "Logged Out Successfully!",
      });
  });

  export const getUser = catchAsyncError((req, res, next) => {
    const user = req.user;
    
    res.status(200).json({
      success: true,
      user,
    });
  });
  
  
  export const updateUser = catchAsyncError(async (req, res, next) => {

    const user = req.user;

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }

  const { idCardImage, profileImage } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  const updatedData = {};

  // idCard
  if(idCardImage){
    if (!allowedFormats.includes(idCardImage.mimetype)) {
      return next(
        new ErrorHandler("Invalid file type. Please upload a PNG/JPG/WEBP file.", 400)
      );
    }
    const cloudinaryResponseIdCard = await cloudinary.uploader.upload(
      idCardImage.tempFilePath
    );
    
    if (!cloudinaryResponseIdCard || cloudinaryResponseIdCard.error) {
      console.error(
      "Cloudinary Error:",
      cloudinaryResponseIdCard.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  updatedData.document =  {
    public_id: cloudinaryResponseIdCard.public_id,
    url: cloudinaryResponseIdCard.secure_url,
  }
}

if(profileImage){

  
  // profileImage
  if (!allowedFormats.includes(profileImage.mimetype)) {
    return next(
      new ErrorHandler("Invalid file type. Please upload a PNG/JPG/WEBP file.", 400)
    );
  }
  const cloudinaryResponseProfileImage = await cloudinary.uploader.upload(
    profileImage.tempFilePath
  );
  
  if (!cloudinaryResponseProfileImage || cloudinaryResponseProfileImage.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponseProfileImage.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }

  updatedData.profilePicture =  {
    public_id: cloudinaryResponseProfileImage.public_id,
    url: cloudinaryResponseProfileImage.secure_url,
  }
  // updatedData.profilePicture = cloudinaryResponseProfileImage;
  
}




  const updateUserByEmail = async (email, updateData) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: email },        
        { $set: updateData },     
        { new: true }            
      );
      
      if (!updatedUser) {
        console.log('User not found');
        res.status(404).json({
          success: false,
          message: "User Not found!",
          
        });
      } else {
        console.log('User updated successfully:', updatedUser);
        res.status(200).json({
          success: true,
          message: "User details updated successfully!",
          
        });
        return;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return next(
        new ErrorHandler("Server Error", 500)
      );
    }
  };
  console.log(user.email)

  updateUserByEmail(user.email, updatedData);

});