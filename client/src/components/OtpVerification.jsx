import { useState } from 'react'
import axios from 'axios'

export default function OtpVerification({ email }) {
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    setLoading(true)
    try {
      await axios.post('/api/auth/send-otp', { email })
      setMessage('OTP sent to your email')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/verify-otp', { email, otp })
      setMessage(res.data.message)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleSendOtp} disabled={loading}>
        Send OTP
      </button>

      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify} disabled={loading || otp.length !== 6}>
        Verify OTP
      </button>

      {message && <p>{message}</p>}
    </div>
  )
}
