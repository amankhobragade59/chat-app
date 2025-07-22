import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(400).json({message:"Unauthorised: token not available"});
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        if(!decoded){
            return res.status(400).json({message:"Unauthorised: Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(400).json({message:"Unauthorised: user not found"});
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("error in auth middleware",error.message);
        res.status(500).json({message:"internal server error"});
    }
}