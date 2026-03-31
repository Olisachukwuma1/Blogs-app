const User  = require("../models/user")
const Otp = require("../models/otp")     
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const crypto = require("crypto")         
const { Resend } = require("resend")



const resend = new Resend(process.env.RESEND_API_KEY)

//signup-controller


exports.signupUser = async (req, res) => {
      console.log("Otp model:", Otp)
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: "All fields are required" })
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User or email already exists" })
    }

    const hashedPass = await bcrypt.hash(password, 10)

    // Save user as unverified
    const newUser = new User({ username, email, password: hashedPass, isVerified: false })
    await newUser.save()

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString()

    // Delete any old OTPs for this email
    await Otp.deleteMany({ email })

    // Save new OTP
    await Otp.create({ email, otp })

    // Send OTP email
   const result = await resend.emails.send({
  from: "onboarding@resend.dev", // use this for testing
  to: email,
  subject: "Verify Your Account - AugieTech",
  text: `Welcome to AugieTech! Your verification OTP is ${otp}. It expires in 5 minutes.`
})
console.log( result)
    return res.status(200).json({ 
      success: true, 
      message: "Account created. Please check your email for the OTP." 
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, error: "Internal server error" })
  }
}



//verify email controller
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({ success: false, error: "Email and OTP are required" })
    }

    const record = await Otp.findOne({ email })

    if (!record) {
      return res.status(400).json({ success: false, error: "OTP expired or not found" })
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, error: "Invalid OTP" })
    }

    // Mark user as verified
    await User.updateOne({ email }, { isVerified: true })

    // Delete OTP
    await Otp.deleteMany({ email })

    return res.status(200).json({ success: true, message: "Email verified successfully. You can now login." })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, error: "Internal server error" })
  }
}

//resend OTP controller
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ success: false, error: "Email not found" })
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, error: "Email already verified" })
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString()
    await Otp.deleteMany({ email })
    await Otp.create({ email, otp })

await resend.emails.send({
  from: "onboarding@resend.dev",
  to: email,
  subject: "Resend OTP - AugieTech",
  text: `Your new OTP is ${otp}. It expires in 5 minutes.`
})

    return res.status(200).json({ success: true, message: "New OTP sent to your email" })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, error: "Internal server error" })
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
// add this block
if (!existingUser.isVerified) {
  return res.status(400).json({ success: false, error: "Please verify your email first" })
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
            
