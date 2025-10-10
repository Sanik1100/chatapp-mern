import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'

const Left = () => {
  return (
    <div className='w-full text-gray-300 bg-black'>
  
      <Search/>
      <div className='flex-1 overflow-y-auto' 
      style={{ minHeight: "calc(84vh - 10vh"}}
      >
        <Users/>

      </div>
      <Logout/>
      </div>
   
  )
}

export default Left