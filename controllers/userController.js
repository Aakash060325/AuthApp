import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const register=async(req,res)=>{
    const {email,password}=req.body;
    try {
      const check= await User.findOne({email:email});
      if(check){
       return res.status(400).json({message:"already registered"});
      }

    //password hashing
     const hashPassword=await bcrypt.hash(password,10);
     
      const store=new User({
        email:email,
        password:hashPassword
      });
      const newUser=await store.save();

      res.status(201).json({message:"register successfully",data:newUser});
    } catch (error) {
     return res.status(500).json({error:error.message});
    }
}


export const login=async(req,res)=>{

    const user=req.body;

try {
    const check=await User.findOne({email:user.email});
    if(!check){
        return res.status(404).json({message:"user not found"});
    }

    const isMatch=await bcrypt.compare(user.password,check.password);
    if(!isMatch){
        return res.status(401).json({message:"invalid password"});
    }
    const token=jwt.sign({id:check._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.status(200).json({message:"login successful",token:token});
} catch (error) {
    return res.status(500).json({error:error.message});
}


}