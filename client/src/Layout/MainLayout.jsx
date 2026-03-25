import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
const MainLayout = () => {
  return (
    <div className=" px-12 md:px-32 lg:py-64 min-h-screen flex flex-col">
      <Navbar />
      <main className="py-4 flex-grow">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default MainLayout
