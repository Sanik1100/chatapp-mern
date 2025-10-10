import React, { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";
const Typesend = () => {
  const [message,setMessage]= useState("");
  const {loading, sendMessages}= useSendMessage();

  const handleSubmit= async (e) => {
    e.preventDefault();
    await sendMessages(message)
     setMessage("")
    
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-2 h-[8vh]  bg-gray-800">
      <div className="w-[70%] px-4">
        <input 
        type="text"
         placeholder="Type here"
         value={message}
         onChange={(e)=> setMessage(e.target.value)}
          className="border border-gray-700 rounded-xl  outline-none mt-1 px-4 py-3  w-full" />
      </div>

      <button>
        <IoSendSharp className="text-3xl" />
      </button>
    </div>
    </form>
  );
};

export default Typesend;
