import mongoose from "mongoose";
import User from "./User.js";
import Message from "./Message.js";

const conversationSchema= new mongoose.Schema({
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Message,
            default: []
        }
    ]

},{timestamps: true})
const Conversation= mongoose.model("conversationed",conversationSchema);
export default Conversation;