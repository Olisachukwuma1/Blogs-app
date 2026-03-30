import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useSelector, useDispatch  } from "react-redux"
import { authActions } from "../../store/authReducer"
import axios from "axios"

const SignUp = () => {
  const history = useNavigate()
  const backendLink = useSelector((state) => state.prod.link)
    const dispatch = useDispatch()
  const [step, setStep] = useState(1) // step 1 = signup, step 2 = otp
  const [email, setEmail] = useState("") // store email for otp step
  const [otp, setOtp] = useState("")
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  })

  const change = (e) => {
    const { name, value } = e.target
    setInputs({ ...Inputs, [name]: value })
  }

  // Step 1 - Signup
  const SubmitHandler = async (e) => {
    e.preventDefault()
    try {
    await axios.post(
        `${backendLink}/api/v1/signup`,
        Inputs,
        { withCredentials: true }
      )
      toast.success("Account created! Please check your email for OTP.")
      setEmail(Inputs.email) // save email for otp step
      setStep(2) // move to OTP step
    } catch (error) {
      toast.error(error.response.data.error)
    }
     finally {
  setInputs({
    username: "",
    email: Inputs.email,
    password: Inputs.password
  })
}
  }

  // Verify OTP
const verifyOtp = async (e) => {
  e.preventDefault()
  try {
    // Step 1 - Verify OTP
    await axios.post(
      `${backendLink}/api/v1/verify-email`,
      { email, otp },
      { withCredentials: true }
    )

    // Step 2 - Auto login
    const loginRes = await axios.post(
      `${backendLink}/api/v1/log-in`,
      { email, password: Inputs.password },
      { withCredentials: true }
    )

    // Step 3 - Dispatch to Redux
    dispatch(authActions.login(loginRes.data.user))

    toast.success("Email verified! Welcome 🎉")

    // Step 4 - Redirect to profile
    history("/profile")

  } catch (error) {
    toast.error(error.response?.data?.error || "Something went wrong")
  }
}
  // Resend OTP
  const resendOtp = async () => {
    try {
      await axios.post(
        `${backendLink}/api/v1/resend-otp`,
        { email },
        { withCredentials: true }
      )
      toast.success("New OTP sent to your email!")
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='p-12 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%] flex flex-col items-center justify-center gap-4'>

        {/* Step 1 - Signup Form */}
        {step === 1 && (
          <>
            <div className='text-2xl flex flex-col lg:flex-row gap-2 text-center'>
              <h1 className='font-bold'>Welcome!!</h1>
              <span>Signup as a new user</span>
            </div>

            <form
              onSubmit={SubmitHandler}
              className='flex flex-col w-[100%] mt-8'>
              <div className='flex flex-col mb-4'>
                <label>Username:</label>
                <input
                  type="text"
                  value={Inputs.username}
                  name='username'
                  className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400'
                  required
                  onChange={change}
                />
              </div>
              <div className='flex flex-col mb-4'>
                <label>Email:</label>
                <input
                  type="email"
                  value={Inputs.email}
                  name='email'
                  className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400'
                  required
                  onChange={change}
                />
              </div>
              <div className='flex flex-col'>
                <label>Password:</label>
                <input
                  type="password"
                  value={Inputs.password}
                  name='password'
                  className='mt-2 outline-none border px-3 py-2 border-zinc-400'
                  required
                  onChange={change}
                />
              </div>
              <div className='flex mt-4'>
                <button className='bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white px-4 py-2 rounded w-[100%]'>
                  Sign Up
                </button>
              </div>
            </form>

            <h4 className="mt-8">Already have an account with us?
              <Link to="/login" className="text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </h4>
          </>
        )}

        {/* Step 2 - OTP Verification */}
        {step === 2 && (
          <>
            <div className='text-2xl flex flex-col gap-2 text-center'>
              <h1 className='font-bold'>Verify Your Email</h1>
              <span className="text-sm text-zinc-500">
                We sent a 6-digit OTP to <strong>{email}</strong>
              </span>
            </div>

            <form
              onSubmit={verifyOtp}
              className='flex flex-col w-[100%] mt-8'>
              <div className='flex flex-col mb-4'>
                <label>Enter OTP:</label>
                <input
                  type="text"
                  value={otp}
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400 tracking-widest text-center text-xl'
                  required
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div className='flex mt-4'>
                <button
                  type="submit"
                  className='bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white px-4 py-2 rounded w-[100%]'>
                  Verify Email
                </button>
              </div>

              <div className='flex mt-3'>
                <button
                  type="button"
                  onClick={resendOtp}
                  className='bg-zinc-100 hover:bg-zinc-200 transition-all duration-300 text-zinc-700 px-4 py-2 rounded w-[100%]'>
                  Resend OTP
                </button>
              </div>
            </form>

            <button
              onClick={() => setStep(1)}
              className="text-sm text-zinc-400 hover:text-zinc-600 mt-2">
              ← Back to Signup
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default SignUp