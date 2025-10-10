import React from 'react'
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from '../../context/userGetAllUsers';
import useConversation from '../../zustand/userConversation';
import toast from 'react-hot-toast';
const Search = () => {
  const [search,setSearch]= useState("");
  const [allUsers]=useGetAllUsers();
  const {setSelectedConversation}=useConversation();
  const handleSubmit=(e)=>{
    e.preventDefault();
   if(!search) return;
   const conversation= allUsers.find((user)=>
  user.fullname?.toLowerCase().includes(search.toLowerCase())
  );
  if(conversation){
    setSelectedConversation(conversation);
    setSearch("");
  }else{
    toast.error("User not found");
  }
  };
  return (
   <div className='h-[12vh]'>
     <div className='px-6 py-4 '>
        <form onSubmit={handleSubmit}>
           <div className='flex space-x-3'>
             <label className=" border-[1px] border-gray-600 bg-slate-900 p-3 w-[80%] flex items-center gap-2 ">
  <input type="search"
   className="grow outline-none bg-transparent"
    placeholder="Search"
     value={search}
      onChange={(e)=>setSearch(e.target.value)} />
</label>
<button>
<FaSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300'/>
</button>
           </div>
        </form>
    </div>
   </div>
  )
}

export default Search