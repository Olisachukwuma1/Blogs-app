import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({items}) => {
  return (
    <>
       <div className='w-full lg:w-4/6'>
       <img src={items.img} alt="Blog Image" className='rounded object-cover'/>
       </div>
        <div className='w-full lg:w-4/6'>
        <h1 className='text-2xl font-semibold'>{items.title}</h1>
        <p className='mb-4'>{items.desc.slice(0, 350)}...</p>
        <Link to="/description/id" className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition duration-300">
        Read Blog
        </Link>
        </div>
    </>
  )
}

export default BlogCard
