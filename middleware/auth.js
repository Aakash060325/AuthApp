import jwt from "jsonwebtoken";

export const auth=async(req,res,next)=>{

    
        const authorization=req.headers.authorization;

if(!authorization){
    return res.status(401).json({message:"authorization token missing"});
}

const token=authorization.split(' ')[1];

try{
const decoded=jwt.verify(token,process.env.JWT_SECRET);
req.user=decoded
        next();
    } catch (error) {
        return res.status(401).json({message:"token not valid"});
    }
}
