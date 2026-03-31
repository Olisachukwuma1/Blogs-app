const express = require('express');
const app = express();
const cookieparser = require("cookie-parser")
const cors = require("cors")
require ("dotenv").config()
require("./conn/conn")
const userApi = require("./routes/user")
const adminApi = require("./routes/admin")
app.use(cors({
    origin:   [
         process.env.FRONTEND_URL,
    "https://blogs-app-mu.vercel.app",
    "https://blogs-gjvk2tpd5-olisachukwuma1s-projects.vercel.app",
    "https://blogs-pihggub2t-olisachukwuma1s-projects.vercel.app",
    "http://localhost:5173"
  ],
    credentials: true,  

}))
app.use(express.json())
app.use(cookieparser())

app.get("/",(req,res) => {
   res.send ("Hello")
})
 

//calling routes
app.use("/api/v1", userApi)
app.use("/api/v1", adminApi)

//server
app.listen (process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`);
});