import React from 'react'
import assets from '../assets/assets'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between px-8'>
      <div>
        <img src={assets.logo} alt="Pizza Point (Admin)" className='h-[70px]'/>
      </div>
      <div className='flex justify-center items-center'>
        <img src={assets.profile} alt="User" className='h-[50px] rounded-full'/>
      </div>
    </div>
  )
}

export default Navbar
