import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoReorderThreeSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [MobileNav, setMobileNav] = useState(false);
  
  // 1. Grab both isLoggedIn AND isLoading from your auth state
  const { isLoggedIn, isLoading, user } = useSelector((state) => state.auth);

  // 2. The "Flicker Guard"
  // If we are still fetching the user from the cookie, return an empty bar 
  // or a simple logo so the Login buttons don't flash.
  if (isLoading) {
    return (
      <nav className="flex items-center justify-between py-4 border-b-2 border-zinc-500 bg-white">
        <div className="brandname">
           <Link to="/" className="text-xl font-bold px-4">Augustine Blogger</Link>
        </div>
        <div className="animate-pulse bg-zinc-200 h-8 w-24 rounded-md me-4"></div>
      </nav>
    );
  }

  const links = [
    { name: 'Home', to: '/' },
    { name: 'All Blogs', to: '/all-blogs' },
  ];

  if (isLoggedIn) {
    links.push({ name: 'Profile', to: '/profile' });
  } else {
    links.push({ name: 'Login', to: '/login' });
  }

  return (
    <nav className="relative flex items-center justify-between py-4 border-b-2 border-zinc-500 bg-white z-50">
      <div className="w-3/6 lg:w-2/6 brandname ps-4">
        <Link to="/" className="text-xl font-bold">
          Augustine Blogger
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="w-4/6 hidden lg:flex items-center justify-end pe-4">
        {links.map((items, i) => (
          <Link
            className="ms-4 hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
            key={i}
            to={items.to}
          >
            {/* If it's the profile link and we have a user, show their small avatar */}
            {items.name === 'Profile' && user?.avatar && (
              <img src={user.avatar} className="w-6 h-6 rounded-full object-cover" alt="" />
            )}
            {items.name}
          </Link>
        ))}

        {!isLoggedIn && (
          <Link
            className="ms-4 bg-black rounded-md px-4 py-1 text-zinc-100 hover:bg-blue-600 transition-all duration-300"
            to="/signup"
          >
            SignUp
          </Link>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="w-3/6 flex lg:hidden items-center justify-end pe-4">
        <button className="text-4xl" onClick={() => setMobileNav(!MobileNav)}>
          <IoReorderThreeSharp />
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed top-0 left-0 nav-bg h-screen w-full backdrop-blur-md p-8 z-40
          ${MobileNav ? "translate-y-[0%] flex flex-col" : "translate-y-[-100%]"} transition-all duration-300`}
      >
        <div className="w-full flex justify-end">
          <button className='text-3xl absolute top-4 right-4' onClick={() => setMobileNav(false)}>
            <RxCross2 />
          </button>
        </div>

        <div className='h-[100%] flex flex-col items-center justify-center'>
          {links.map((items, i) => (
            <Link
              className="mb-8 text-4xl hover:text-blue-600 transition-all duration-300 flex items-center gap-4"
              key={i}
              to={items.to}
              onClick={() => setMobileNav(false)}
            >
               {items.name === 'Profile' && user?.avatar && (
                <img src={user.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
              )}
              {items.name}
            </Link>
          ))}
          
          {!isLoggedIn && (
            <Link
              className="text-4xl bg-black rounded-md px-4 py-2 text-zinc-100 hover:bg-blue-600 transition-all duration-300"
              to="/signup"
              onClick={() => setMobileNav(false)}
            >
              SignUp
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;