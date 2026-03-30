const router = require("express").Router()
const userController = require("../controller/userController")
const authMiddleware = require ("../middleware/authMiddleware")
const upload = require("../middleware/ImageUpload")

//signup route
router.post("/signup", userController.signupUser)

// verify email OTP  ← add this
router.post("/verify-email", userController.verifyEmail)

// resend OTP ← add this
router.post("/resend-otp", userController.resendOtp)

//log-in route
router.post("/log-in", userController.loginUser)

//check cookies
router.get("/check-cookie", userController.checkcookie)

//logout
router.post("/logout", userController.logout)

//profile route
router.get("/getProfileData", 
    authMiddleware.verifyToken,
     authMiddleware.authorizeRole("user"),
    userController.getProfileData)

    //update password route
    router.put(
        "/changeUserPassword", 
    authMiddleware.verifyToken,
     authMiddleware.authorizeRole("user"),
    userController.changeUserPassword)

    //change Avatar
       router.put(
        "/changeAvatar", 
    authMiddleware.verifyToken,
     authMiddleware.authorizeRole("user"),
     upload.single("image"),
    userController.changeAvatar)



module.exports = router