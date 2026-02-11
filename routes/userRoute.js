import { Router } from "express";
import { register, login } from "../controllers/userController.js";
const router=Router();
import {auth} from "../middleware/auth.js";

router.post("/register",register);
router.post("/login",login);

router.get("/profile",auth,(req,res)=>{
res.json({
message:"access granted",
userId:req.user.id
})  
});

export default router;