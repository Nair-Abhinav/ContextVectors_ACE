import React from 'react'
import Logo from '../assets/Svgs/Logo_black.png'
import { Link } from 'react-router-dom'

const Navbar2 = () => {
  return (
    <nav className='flex bg-violet-50 border-b-4 rounded-b-md border-purple-100'>
        <div className='flex flex-[0.5]  items-center m-5 my-2 p-2 pb-0'>
            <img src={Logo} width={70} height={50} alt="" />
            <p className='font-one text-xl ml-1 '>PixelGrid</p>
        </div>
        <div className='flex flex-1 justify-center items-center m-5 my-2 p-2 pb-0'>
            <Link to="/" className='text-lg p-7 font-[400]'>Home</Link>
            <Link to="dashboard" className='text-lg p-5 font-[400]'>Dashboard</Link>
            <Link to="designs" className='text-lg p-5 font-[400]'>Designs</Link>
            <Link to="aboutus" className='text-lg p-5 font-[400]'>About Us</Link>
        </div>
        <div className='flex flex-[0.5] justify-end items-center m-5 my-2 p-2 pb-0'>
            <button className='bg-purple-600 text-slate-50 p-4 py-2 rounded-xl font-semibold text-lg drop-shadow-md hover:bg-purple-500'>Login</button>
        </div>
    </nav>
  )
}

export default Navbar2