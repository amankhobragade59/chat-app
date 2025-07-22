import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {connectDB} from './lib/db.js'
import cors from 'cors'
import {app,server} from './lib/socket.js'
import path from 'path'

const __dirname = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
})
}

dotenv.config();
// const app = express(); removed cause initialize in server too

//middleware
app.use(cookieParser());
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))

//

//routes
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)



const PORT = process.env.PORT;
server.listen(PORT,()=>{// used server.listen instead of app.listen
    console.log(`server is running: ${PORT}`)
    connectDB();
})