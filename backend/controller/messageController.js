import Conversation from "../models/Conversationed.js";
import Message from "../models/Message.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";

export const sendMessage=async (req,res) => {
   // console.log("Message sent",req.params.id,req.body.message);
    try {
        const {message}=req.body;
         // if not {message}that means we have not do destructure the message then we have to write req.body.message
         const {id:receiverId}=req.params;  // if not destructure then req.params.id.receiverId

         console.log("the receiver Id is",receiverId);
         const senderId= req.user._id; // current logged in user
         console.log("the sender id is ",senderId);

         let conversation= await Conversation.findOne({
            members:{
                $all: [senderId,receiverId]
            }
         })

         if(!conversation){
            conversation= await Conversation.create({
                members: [senderId,receiverId],
            });
         }
         const newMessage= new Message({
            senderId,
            receiverId,
            message,
         });
         if(newMessage){
            conversation.messages.push(newMessage._id);
         }

         await Promise.all([conversation.save(),newMessage.save()]); // run parallel to save on the database
         const receiverSocketId= getReceiverSocketId(receiverId);
         if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
         }
         res.status(201).json({
            message: "Message sent successfully",
            newMessage,
         });

    } catch (error) {
       console.log("Error in sendMessage",error);
       res.status(500).json({error: "Internal server error"});
    }
}

export const getMessage=async (req,res) => {
   try {
      const {id:chatUser}= req.params; // here chatUser== receiver who received the message
      const senderId= req.user._id; // current logged in user
      let conversation= await Conversation.findOne({
         members: { $all: [senderId,chatUser]},
      }).populate("messages");
      if(!conversation){
         return res.status(201).json([]); // passing empty array if no conversation
      }
      const messages= conversation.messages;
      res.status(201).json(messages);

   } catch (error) {
      console.log("Error in getMessage",error);
       res.status(500).json({error: "Internal server error"});
   }
   
}