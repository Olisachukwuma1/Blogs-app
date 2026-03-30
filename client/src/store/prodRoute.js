import { createSlice } from "@reduxjs/toolkit";



const prodSlice = createSlice({
name: "prod",
initialState: {
    link: import.meta.env.VITE_BACKEND_URL.replace(/\/$/, ""),
},


 
})

export default prodSlice.reducer