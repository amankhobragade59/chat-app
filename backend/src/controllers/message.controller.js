import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import multer from 'multer';
import cloudinary from 'cloudinary'
import { getReceiverSocketId, io } from '../lib/socket.js';
export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user.userId;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getUserForSideBar: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const getMessages = async (req, res) => {
    let messages=[];
    try {
        const userToChatId = req.params.id;
        const myId = req.user._id;
        messages = await Message.find({
            $or: [
                { senderId: userToChatId, receiverId: myId },
                { senderId: myId, receiverId: userToChatId },
            ]
        }) ;
        res.status(200).json(messages);
    } catch (error) {
        console.log("error in getMessages: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}


export const sendmessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        let imageUrl;
        if (image) {
            // upload base64 to cloudinary
            const uploadResponce = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponce.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
        await newMessage.save();
        //todo: realtime with socket io 
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("error in sendmessage: ", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}