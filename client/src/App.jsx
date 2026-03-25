import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/page.jsx'
import MainLayout from './Layout/MainLayout'
import OtherLayout from './Layout/OtherLayout'
import Login from './pages/Login/page.jsx'
import Signup from './pages/SignUp/page.jsx'
import Profile from './pages/Profile/page.jsx'
import AllBlogs from './pages/AllBlogs/page.jsx'
import DashboardProfile from './components/Profile/DashboardProfile.jsx'
import Favourites from './components/Profile/Favourites.jsx'
import LikedBlogs from './components/Profile/LikedBlogs.jsx'
import Description from './pages/Description/Description.jsx'
import Categories from './pages/Categories/Categories.jsx'
import AdminLogin from './pages/AdminLogin/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard/page.jsx'
import Dashboard from './components/Admin components/Dashboard/Dashboard.jsx'
import AddBlogs from './components/Admin components/Add blog/AddBlogs.jsx'
import EditBlogs from './components/Admin components/Edit Blogs/EditBlogs.jsx'
import UpdateBlog from './components/Admin components/Edit Blogs/Compo/UpdateBlog.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {useDispatch, useSelector } from 'react-redux'; 
import axios from 'axios'
import { authActions } from './store/authReducer.js'
const App = () => {
  const backendlink = useSelector((state) => state.prod.link)
  const dispatch = useDispatch()
useEffect(() => {
    const fetchSession = async () => {
      try {
        // Change check-cookie to getProfileData to get the actual user object
        const res = await axios.get(`${backendlink}/api/v1/getProfileData`, {
          withCredentials: true,
        })

        if (res.data.data) {
          // Pass the user data to your login action
          dispatch(authActions.login(res.data.data))
        }
      } catch (error) {
   console.error(error);
  dispatch(authActions.logout())
} finally {
        // This is the most important part to stop the Navbar flicker
        dispatch(authActions.setLoading(false))
      }
    };
    
    fetchSession();
  }, [dispatch, backendlink]);
  return (
    <>
      <ToastContainer />

      <Routes>

        
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="all-blogs" element={<AllBlogs />} />
           <Route path="/description/:id" element={<Description/>} />
          <Route path="/cat/:id" element={<Categories/>} />
          <Route path="profile" element={<Profile />}>
            
            <Route index element={<DashboardProfile />} />
            <Route path="favourites" element={<Favourites/>} />
            <Route path="liked-blogs" element={<LikedBlogs />} />
          </Route>
        </Route>

        
        <Route element={<OtherLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
           <Route path="/admin-login" element={<AdminLogin />} />
             <Route path="/admin-dashboard" element={<AdminDashboard />} >
                <Route index element={<Dashboard />} />
                  <Route path="/admin-dashboard/add-blogs" element={<AddBlogs />} />
                   <Route path="/admin-dashboard/edit-blogs" element={<EditBlogs />} />
                     <Route path="/admin-dashboard/update-blogs/:id" element={<UpdateBlog />} />

             
             </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App