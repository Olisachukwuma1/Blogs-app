import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false, 
    user: null,        // Store the actual user object here
    isLoading: true,   // Start as true to prevent the Navbar flicker
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Save user data (username, avatar, etc.)
      state.isLoading = false;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = false;
      localStorage.removeItem("isLoggedIn");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;