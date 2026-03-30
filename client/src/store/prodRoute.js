import { createSlice } from "@reduxjs/toolkit";



const prodSlice = createSlice({
name: "prod",
initialState: {
    link: import.meta.env.VITE_BACKEND_URL,
},


 
})

export default prodSlice.reducer