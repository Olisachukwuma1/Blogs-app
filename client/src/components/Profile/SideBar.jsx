import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/authReducer.js'  
const SideBar = () => {
    const SideBarLinks = [
        {
            name:"Dashboard",
            to:"/profile",
        },
         {
            name:"Favourites",
            to:"/profile/favourites",
        },
         {
            name:"Liked Blogs",
            to:"/profile/liked-blogs",
        },
    ]
    const dispatch = useDispatch()
    const backendLink = useSelector((state) => state.prod.link)
    const history = useNavigate()
    const logoutHandler = async () => {
     await axios.post(`${backendLink}/api/v1/logout`, {
      withCredentials: true
    })
  dispatch(authActions.logout()); 
    history("/");
    };
  return (
    <div className='w-[100%] flex flex-col gap-10 md:gap-8 gap-4 pr-4 '>
      {SideBarLinks.map((items, i) => (
        <Link  to={items.to}
         className="hover:font-semibold" key={i} >
          {items.name}</Link>
        ))}
        <button 
        className='bg-zinc-900 text-white rounded w-[100%] py-2 hover:bg-zinc-800 transition-all duration-300 text-center' 
        onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default SideBar
