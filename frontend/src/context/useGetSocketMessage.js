import React from 'react'
import {useSocketContext} from './SocketContext.jsx'
import useConversation from '../zustand/userConversation.js';
import { useEffect } from 'react';
import sound from "../assets/mixkit-bell-notification-933.wav";

const useGetSocketMessage = () => {
    const {socket}=useSocketContext();
    const {messages, setMessage}=useConversation();

    useEffect(()=>{
        socket.on("newMessage",(newMessage)=>{
          const notification= new Audio(sound);
          notification.play();  
            setMessage([...messages,newMessage]);
        });
        return ()=> {
            socket.off("newMessage");
        };
    },[socket,messages,setMessage]);

}

export default useGetSocketMessage;