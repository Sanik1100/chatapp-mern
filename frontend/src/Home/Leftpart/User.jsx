import React from 'react'
import useConversation from '../../zustand/userConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';

const User = ({user}) => {
  const {selectedConversation,setSelectedConversation}=useConversation();
  const isSelected= selectedConversation?._id === user._id;
  const {socket,onlineUsers}= useSocketContext()
  const isOnline= onlineUsers.includes(user._id)
  return (
    <div className={`hover: bg-slate-600 duration-300 ${isSelected ? "bg-slate-700": ""}`}
    onClick={()=> setSelectedConversation(user)}
    >
        <div className='flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer '>
      <div className={`avatar ${isOnline ? "avatar-online":""} `}>
  <div className="w-12 rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
  </div>
</div>

<div>
  <h1 className='font-bold'>{user.fullname}</h1>
  <span className=''>{user.email}</span>
</div>
    </div>
    </div>
  )
}

export default User