import React from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
    const cat = [
    {
        name:"DSA",
        to:"cat/dsa",
        bg:"bg-green-200"
    },
     {
          name:" MERN stack",
        to:"cat/mern-stack",
        bg:"bg-orange-200"
    },
     {
        name:"Web Dev",
        to:"/cat/next-js",
        bg:"bg-pink-200"
    },
    {
        name:"Trending Topics",
        to:"cat/trending-topics",
        bg:"bg-purple-200"
    },
  ]
  return (
    <div className='mb-4 py-4'>
        <h1 className="text-xl font-semibold mb-4">Categories</h1>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-4 '>
      {cat.map((items,i)=>(
        <Link 
        className ={`px-4 py-2 text-center text-normal md:text-2xl font-semibold ${items.bg} rounded`} 
        key={i} 
        to={items.to}>
          {items.name}
        </Link>
      ))}
      </div>
    </div>
  )
}

export default Categories
