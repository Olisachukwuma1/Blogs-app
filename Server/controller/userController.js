const User  = require("../models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
//signup-controller


exports.signupUser = async (req,res) => {
    try{
    const {username,email, password } = req.body
  
   
    if  ( !username || !email || !password) {
        return res 
        .status(400)
        .json ({success:false,error:"All fields are required"})      
}

const existingUser = await User.findOne ({ $or:  [{ username },  { email }]  })
if(existingUser) {
    return res
    .status(400)
    .json({success : false, error: "user or email already existed"})
}


const hashedPass = await bcrypt.hash(password, 10)
const newUser = new User({ username, email, password : hashedPass })
await newUser.save();
return res.status(200).json({success:true, message:"Account created"})
} catch (error){
    console.log(error)
    return res
    .status(400)
    .json({success : false, error: "Internal server error"})
}

}

//login controller
exports.loginUser = async (req,res) => {
    try{
    const {email, password } = req.body
  
   
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
    secure: true ,
    sameSite: "None",
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
exports.checkcookie = async (req,res) => {

    try {
        const token = req.cookies.augietech
        if (token) {
            return res.status(200).json({ message: "true" })
        }
        return res.status(200).json({ message: "false" })
    }catch (error) {
        return res.status(500).json({  error: "Internal server error" })
    }
}
//logout controller
exports.logout = async (req,res) => {
    res.clearCookie("augietech", {
        httpOnly: true,
       secure:true,
        sameSite: "None",
    })
    res.json({ message: "Logged out successfully" })
}
//getProfileData controller
exports.getProfileData = async (req,res) => { 
    try {
        const {user} = req
        const { password, ...safeUserData } = user._doc
       // console.log(safeUserData)
        return res.status(200).json({data: safeUserData})
    }catch (error) {
        return res.status(500).json({ error: "Internal server error"})
   
    }
} 
//change userpassword
exports.changeUserPassword = async (req,res) => { 
    try {
        const {user} = req
        const {password, newPass, confirmNewPass} = req.body
        if(newPass  !== confirmNewPass) {
            return res.status(400).json({
                error: "New password and confirm new password are not same "})
        }
   const Actualpassword = user.password
 const checkPass =  await bcrypt.compare(password, Actualpassword)

   if (!checkPass) {
    return res
    .status(400)
    .json({ success: false, error: "Current Password is not valid "})
}
user.password = await bcrypt.hash(newPass, 10)
await user.save()
     res.status(200).json({message: "Password updated successfully"})
    }catch (error) {
        console.log(error)
 return res.status(500).json({ error: "Internal server error"})
   
    }
} 

//change Avatar
exports.changeAvatar = async (req,res) => { 
    try {
        const {user} = req
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided"})
        }
         //console.log(req.file)
        user.avatar = req.file.path
       await user.save()

        res.status(200).json({message: "Avatar updated successfully"})
        }catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error"})
    }
} 
            
