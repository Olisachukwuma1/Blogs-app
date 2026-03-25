import React from 'react'
import { Link } from 'react-router-dom'

const EditBlogs = () => {
 const data = [
        {
            img:"/vemp.jpg",
            title:"Digital Ink",
            desc:"Digital blogging empowers individuals to share unique perspectives with the world. Through curated content and meaningful dialogue, authors build loyal communities, transforming simple words into powerful tools for education, inspiration, and connection."
        },
           {
            img:"/openmic.jpg",
            title:"The Open Mic: Blogging",
            desc:"Blogging democratizes publishing, allowing anyone to voice ideas instantly. Without gatekeepers, creators craft diverse narratives, fostering global conversations. It remains a vital medium for personal expression and professional growth in our age.."
        },
           {
            img:"/Taylorswift.jpg",
            title:"Taylor swift",
            desc:"Just a few days ago, Taylor was officially inducted into the Songwriters Hall of Fame. At 36, she is the youngest woman ever to receive the honor. She's now in the same league as legends like Elton John and Stevie Wonder—which, let’s be honest, we all saw coming since she wrote Love Story in her bedroom at 17."
        },
           {
            img:"/vemp.jpg",
            title:"Sample Blog Title",
            desc:"This is a sample blog description."
        },
         {
            img:"/vemp.jpg",
            title:"Digital Ink",
            desc:"Digital blogging empowers individuals to share unique perspectives with the world. Through curated content and meaningful dialogue, authors build loyal communities, transforming simple words into powerful tools for education, inspiration, and connection."
        },
           {
            img:"/openmic.jpg",
            title:"The Open Mic: Blogging",
            desc:"Blogging democratizes publishing, allowing anyone to voice ideas instantly. Without gatekeepers, creators craft diverse narratives, fostering global conversations. It remains a vital medium for personal expression and professional growth in our age.."
        },
           {
            img:"/Taylorswift.jpg",
            title:"Taylor swift",
            desc:"Just a few days ago, Taylor was officially inducted into the Songwriters Hall of Fame. At 36, she is the youngest woman ever to receive the honor. She's now in the same league as legends like Elton John and Stevie Wonder—which, let’s be honest, we all saw coming since she wrote Love Story in her bedroom at 17."
        },
           {
            img:"/vemp.jpg",
            title:"Sample Blog Title",
            desc:"This is a sample blog description."
        },  
    ]









  return (
  <div className='p-4 '>
<h1 className='text-2xl font-semibold'>Edit Blogs</h1>
      <div className='grid grid-cols-3  gap-8 lg:gap-4 my-4'>
       { data &&
       data.map((items,i)=>(
      <div key={i} className='bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-sm'>
  <div>
    <div className='w-full'>
      <img 
        src={items.img} 
        alt={items.title} 
        className='w-full h-40 lg:h-48 rounded-lg object-cover' 
      />
    </div>
    <div className='mt-4'>
      <h1 className='text-xl font-bold line-clamp-1'>{items.title}</h1>
      <p className='text-zinc-600 text-sm mt-2 mb-4'>
        {items.desc.slice(0, 100)}...
      </p>
    </div>
  </div>

  <div className='w-full flex items-center justify-between gap-2 mt-auto'>
    <Link 
      to = "/admin-dashboard/update-blogs/:id" 
      className='bg-blue-600 text-center text-white rounded px-4 py-2 flex-1 hover:bg-blue-700 transition'
    >
      Edit
    </Link>
    <button className='bg-red-600 text-white rounded px-4 py-2 flex-1 hover:bg-red-700 transition'>
      Delete
    </button>
  </div>
</div>
      ))}
      </div>
    </div> 
  )
}

export default EditBlogs
