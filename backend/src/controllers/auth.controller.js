import User from '../models/user.model.js'
import generateToken from '../lib/utils.js'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import cloudinary from '../lib/cloudinary.js'
export const signup = async (req, res) => {
    console.log(req.body)
    const { fullName, email, password } = req.body;
    
    try {
        if(!fullName || !email || !password){
            res.status(400).json({ message: "All fields required" })
        }
        if (password.length < 6) {
            res.status(400).json({ message: "password must be at least 6 charecters" })
        } 
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUSer = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUSer) {
            //generate token here
            generateToken(newUSer._id, res);
            await newUSer.save();

            res.status(201).json({
                _id:newUSer._id,
                fullName: newUSer.fullName,
                email: newUSer.email,
                profilePic: newUSer.profilePic,
            });

        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({message:"internal server error"})
    }
}

export const login = async (req, res) => {
    const { email,password} =req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "User Dont exist!" });
        }
        const isCorrectPassword = await bcrypt.compare(password,user.password);

        if(! isCorrectPassword){
            return res.status(400).json({ message: "Incorrect Password!" })
        }

        generateToken(user._id,res);

        res.status(200).json({ 
            _id: user._id,
            fullName: user.fullName
         })
    } catch (error) {
        console.log("error in login controller",error.message);
        res.status(500).json({message:"internal server error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({message:"internal server error"});
    }
}
export const checkAuth= (req,res)=>{
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller",error.message);
        return res.status(500).json({message:"internal server error"});
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }

        const uploadResponce = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponce.secure_url},{new:true});
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in updateProfile controller",error.message);
        res.status(500).json({message:"internal server error"});
    }
}