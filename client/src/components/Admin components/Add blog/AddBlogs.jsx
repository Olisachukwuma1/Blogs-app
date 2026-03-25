import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddBlogs = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [Loading, setLoading] = useState(false); // Default to false

  const handleAddBlog = async (e) => {
    e.preventDefault();

    // Basic validation to prevent empty uploads
    if (!Title || !Description || !Image) {
      return toast.error("Please fill all fields and select an image");
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("title", Title);
      form.append("description", Description);
      form.append("image", Image);

      const res = await axios.post(`${backendLink}/api/v1/addBlog`, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "Blog added successfully!");
      
      // Clear form on success
      setTitle("");
      setDescription("");
      setImage(null);
      e.target.reset(); // Resets the file input field
    } catch (error) {
      console.error(error);
      // Added optional chaining (?.) so it doesn't crash if error.response is undefined
      toast.error(error.response?.data?.error || "Failed to add blog");
    } finally {
      setLoading(false);
    }
  }; // handleAddBlog ends here

  return (
    <div className='p-4 h-screen'>
      <h1 className='text-2xl font-semibold'>Add Blogs</h1>

      <form className='my-4 flex flex-col gap-4' onSubmit={handleAddBlog}>
        <input
          type='text'
          placeholder='Title'
          className='border-none outline-none p-4 bg-transparent text-3xl border-b border-zinc-400 font-semibold w-full'
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Description'
          className='border-none outline-none p-4 bg-transparent text-xl border-b border-zinc-400 font-semibold w-full'
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <input
            type="file"
            className="bg-zinc-900 rounded text-white"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          {Loading ? (
            <div className="bg-blue-400 w-fit text-xl px-4 text-white rounded py-2 shadow-xl">
              Adding Blogs....
            </div>
          ) : (
            <button 
              type="submit"
              className="bg-blue-600 text-xl px-4 text-white rounded py-2 shadow-xl hover:bg-blue-700 transition-all duration-100"
            >
              Add Blog
            </button>
          )}
        </div>
      </form>
    </div>
  );
}; // Component ends here

export default AddBlogs;