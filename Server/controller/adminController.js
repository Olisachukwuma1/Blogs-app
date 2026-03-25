const User  = require("../models/user")
const Blog  = require("../models/blog")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

exports.adminLogin = async (req,res) => {
     try{
     const { email, password } = req.body
   
    
     if  (  !email || !password) {
         return res 
         .status(400)
         .json ({
             success:false,
             error:"All fields are required"})      
 }
 
 const existingUser = await User.findOne ({ email })
 if(!existingUser) { 
     return res 
     .status(400)
     .json({
         success : false, 
         error: "invalid credentials"})
 }
 
 const checkPass = await bcrypt.compare(password, existingUser.password)
 if (!checkPass) {
     return res
     .status(400)
     .json({
         success : false, 
         error: "invalid credentials"})
 }
 
 const token = jwt.sign({
 id: existingUser._id, 
 email: existingUser.email,
     },  
     process.env.JWT_SECRET,
     {expiresIn: "30d",// token expires in 30 days
 
     })
 res.cookie("augietech", token, {
     httpOnly: true,
     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
     secure: false,
     sameSite: "Lax",
 }) 
 return res
 .status(200)
 .json({
     success:true,
      message:"Login successful", 
      user: existingUser})
 } catch (error){
     console.log(error)
     return res
     .status(400)
     .json({
         success : false,
          error: "Internal server error"})
 }
}

//create blog 

exports.addBlog = async (req,res) => {
  
try{
    const {title, description} = req.body;

    if (!title || !description ) {
        return res.status(400).json({
            error: "All fields are required"
        })
    }
    if (!req.file) {
        return res.status(400).json({
            error: "Image is required"
        })
    }
// adminController.js
const newBlog = new Blog({ 
    title, 
    description, 
    image: req.file ? req.file.path : undefined // Make sure this matches your Schema
});
await newBlog.save()
return res.status(200).json({success: true, 
    message: "Blog added "})

} catch (error){
    console.log(error)
    return res.status(400).json({
        success: false, error: "Internal server error"
    })
}

}