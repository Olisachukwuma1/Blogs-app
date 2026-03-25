import React from 'react'
import BlogCard from '../../components/Blog Card/BlogCard.jsx'

const AllBlogsComponent = () => {
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
 <div className='mb-4 py-4'>
     
      <div className='flex flex-col gap-8 lg:gap-4'>
       { data &&
       data.map((items,i)=>(
        <div key={i} className='flex flex-col lg:flex-row gap-2 lg:gap-4 '>
        <BlogCard items={items}/>
      </div>
      ))}
      </div>
    </div>
  )
}

export default AllBlogsComponent
