import React, { useState ,useEffect} from 'react'
import { FaUser }   from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
const DashboardProfile = () => {
  const[ChangeAvatar, setChangeAvatar] =useState(null)
  const ChangeImage = (e)=>{
     setChangeAvatar(e.target.files[0])
  }
  const backendlink = useSelector((state) => state.prod.link)
  const [UserData, setUserData] = useState();

   useEffect(() => {
      const fetch = async() => {
      const res  = await axios.get (`${backendlink}/api/v1/getProfileData`, {
        withCredentials: true,
      })
   setUserData(res.data.data)
      }
      fetch();
      }, []);
console.log(UserData)
      const [Passwords, setPasswords] = useState({
        password:"", 
        newPass:"", 
        confirmNewPass:""
      })
      const changePass = (e) => {
        const {name, value} = e.target;
        setPasswords({...Passwords, [name]: value})
      }
      const handlePass = async (e) => {
        e.preventDefault()
        try {
          const res = await axios.put(`${backendlink}/api/v1/changeUserPassword`,
             Passwords, 
             { withCredentials: true,
          })
          toast.success(res.data.message)
          setChangeAvatar(null)
          setPasswords({
            password:"", 
            newPass:"", 
            confirmNewPass:""
          })
        } catch (error) {
          toast.error(error.response.data.error)
        }
      }
      const updateAvatar = async () => {
         try {
          const formData = new FormData()
          formData.append("image", ChangeAvatar)
          const res = await axios.put(`${backendlink}/api/v1/changeAvatar`,
             formData, 
             { withCredentials: true,
          })
          toast.success(res.data.message)  
        } catch (error) {
          toast.error(error.response.data.error)
        }
      }
  return (
  <>{UserData &&   <div className='flex flex-col'>
      <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
        <div>
          {" "}
      <div className='size-[20vh] border rounded-full' >
        <label 
        className='w-[100%] h-[100%] flex items-center justify-center'
         htmlFor="imgfile">

          { UserData && UserData.avatar ? (
            <img 
              src={
                ChangeAvatar ? 
                URL.createObjectURL(ChangeAvatar)
                 :`${ UserData.avatar}`
             
              }
              alt="" 
              className=' size-[100%] rounded-full  object-cover '/>
              ) :(  

            <FaUser className='size-[12vh] text-zinc-600'/>
)}
        </label> 
        </div>
        <div className='mt-4 flex items-center justify-center'>
          <input type="file"
          id='imgfile'
          accept='jpeg,jpg,.png'
          className='mb-4 bg-zinc-900 text-white hidden'
          onChange={ChangeImage}
          />
        <button className='bg-blue-700  hover:bg-blue-600 transiton-all duration-300 text-center px-4 py-2 text-white rounded' onClick={updateAvatar}>
           Change avatar 
           </button>
      </div>
      </div>
      <div>
        <p className='text-zinc-700'>{UserData?.email}</p>
        <h1 className=' text-2xl md:text-3xl lg:text-5xl mt-2 font-semibold'>{UserData?.username}</h1>
        </div>
      </div>
      <hr className='my-8'/>
      <div>
        <h1 className='text-2xl font-semibold'>Change Account's Password</h1>
      <form action = "" className='my-4' onSubmit={handlePass}>
        <div className='flex flex-col'>
          <label htmlFor="">Current Password</label>
          <input 
  type="password"
  placeholder='Current Password'
   value={Passwords.password} 
   name='password'
    className='mt-2 outline-none border px-3 py-2 rounded border-zinc-400'
    required
    onChange={changePass} 
    />
          </div>
          <div className='flex flex-col mt-4'>
          <label htmlFor="">New Password</label>
          <input 
  type="password"
  placeholder='New Password'
  value={Passwords.newPass} 
   name='newPass'
    className='mt-2outline-none border px-3 py-2 rounded border-zinc-400'
    required
  onChange={changePass} 
    />
        </div>

          <div className='flex flex-col mt-4'>
          <label htmlFor="">  Confirm New Password</label>
          <input 
  type="password"
  placeholder='Confirm New Password'
   value={Passwords.confirmNewPass} 
   name='confirmNewPass'
    className='mt-2outline-none border px-3 py-2 rounded border-zinc-400'
    required
    
    onChange={changePass} 
    />
        </div>
        <div className='mt-4'>
          {""}
<button className='bg-blue-700  hover:bg-blue-600 transiton-all duration-300 text-center px-4 py-2 text-white rounded'>Update Password</button>
        </div>
      </form>
      </div>
    </div>}</>
  )
}

export default DashboardProfile
