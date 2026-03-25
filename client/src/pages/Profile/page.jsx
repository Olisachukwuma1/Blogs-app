import React, { useState } from 'react'
import SideBar from '../../components/Profile/SideBar.jsx'
import { Outlet } from 'react-router-dom'
import { BsArrowRight } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx";


const Profile = () => {
  const [sideBarDiv, setsideBarDiv] = useState(false);



  return (
    <div className='relative mb-4 py-4 flex items-start justify-between gap-8 '> 
        <div className= {`bg-white 
          ${sideBarDiv ? "text-2xl h-screen fixed top-0 left-0 w-[70%] ": "hidden"
            } lg:text-normal lg:h-auto lg:block  flex flex-col items-center justify-center p-4 lg:p-0 border-r lg:relative lg:w-1/6 z-[10]`}>

           <div classNa me='absolute top-8 right-8 lg:hidden '>
            <button 
            className='text-3xl'
             onClick ={() => setsideBarDiv(!sideBarDiv)} 
             >
              <RxCross2/>
            </button>
           </div>
            <SideBar/>
        </div>
        <div className='absolute top-0 left-0 block lg:hidden  z-[2]'>
         <button onClick={()=> setsideBarDiv(!sideBarDiv)}> 
          <BsArrowRight className='text-2xl'/>{""}
          </button>
          </div>
        <div className='w-full lg:w-5/6 max-h-auto min-h-screen'>
         <Outlet/>
        </div>
    </div>
  )
}

export default Profile
