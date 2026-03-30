const express = require('express')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const Otp = require('../models/otp')
const rateLimit = require('express-rate-limit')

const router = express.Router()

// Rate limit: max 3 OTP requests per 10 minutes per IP
const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: 'Too many OTP requests, please try again later'
})

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Send OTP
router.post('/send-otp', otpLimiter, async (req, res) => {
  const { email } = req.body

  try {
    const otp = crypto.randomInt(100000, 999999).toString()

    // Delete any existing OTP for this email
    await Otp.deleteMany({ email })

    // Save new OTP
    await Otp.create({ email, otp })

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    })

    res.json({ message: 'OTP sent successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP' })
  }
})

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body

  try {
    const record = await Otp.findOne({ email })

    if (!record) return res.status(400).json({ message: 'OTP expired or not found' })
    if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' })

    // OTP is valid — delete it
    await Otp.deleteMany({ email })

    res.json({ message: 'OTP verified successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Verification failed' })
  }
})

module.exports = router