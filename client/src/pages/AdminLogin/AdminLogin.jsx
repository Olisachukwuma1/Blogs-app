import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => { 
    const backendlink = useSelector((state) => state.prod.link)
 const history = useNavigate()
    const [Inputs, setInputs] = useState({
        email: "",
      password: ""
    });
      const change=(e)=>{
  const {name, value}= e.target;
  setInputs({...Inputs, [name]: value
  })
}
 const handleAdminLogin= async (e) =>{
  e.preventDefault();
try{
const res = await axios.post(`${backendlink}/api/v1/adminLogin`, Inputs,{
   withCredentials: true 
  });
toast.success(res.data.message);
history("/admin-dashboard")
}catch (error){
  console.log(error)
}
 }
  return (
      <div className='h-screen flex items-center justify-center'>
      <div className=' p-12 shadow-2xl rounded w-[80%] md:w-[60%] lg:w-[40%]  w-[40%] flex flex-col items-center justify-center gap-4'>
        <div className='text-2xl flex flex-col lg:flex-row gap-2 text-center'>
          <h1 className='font-bold'>Admin-Login</h1>
           <span>please login to continue</span>
           </div>
<form action="" className='flex flex-col w-[100%] mt-8' onSubmit={handleAdminLogin}>
<div className='flex flex-col'>
  <label>Email:</label>
  <input 
  type="email"
   value={Inputs.email} 
   name='email'
    className='mt-2outline-none border px-3 py-2 rounded border-zinc-400'
    required
     onChange={change} />
  </div>
<div 
className='flex flex-col'>
  <label>Password:</label>
  <input type="password"
   value={Inputs.password} 
   name='password'
   className='mt-2outline-none border px-3 py-2  border-zinc-400'
   required
    onChange={change}
    />
  </div>
  <div className='flex mt-4'>
<button className='bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white px-4 py-2 rounded w-[100%]'>
  Login</button>
  </div>
</form>

      </div>
    </div>
   
  )
}

export default AdminLogin
