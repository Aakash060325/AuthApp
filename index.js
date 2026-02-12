import express from "express";
const app=express();
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to database");
})
.catch((error)=>{
    console.log("error connecting to database",error);
});

app.use("/api/users",userRouter);

app.listen(process.env.PORT,()=>{
    console.log(`server is running in port ${process.env.PORT}`);
});
