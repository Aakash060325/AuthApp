import { Router } from "express";
import { register, login } from "../controllers/userController.js";
const router=Router();
import {auth} from "../middleware/auth.js";
import User from ".././models/user.js"

router.post("/register",register);
router.post("/login",login);

router.get("/profile",auth,async(req,res)=>{
    const userId=req.user.id;
    const username=await User.findById(userId); 
    if(!username){
        return res.status(404).json({message:"user not found"});
    }
    const name=username.email.split("@")[0];
res.json({
message:"access granted",
userId:req.user.id,
name:name

})  
});

export default router;