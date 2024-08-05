import React from 'react'

const Navbar = () => {
  return (
    <div>
       <nav className='flex justify-between bg-blue-200 text-white'>
        <div className="logo">
            <span className='font-bold text-xl mx-10'>TODO</span>
        </div>
        <ul className='flex gap-9 mx-10'>
            <li className='cursor-pointer text-black hover:text-white hover:font-bold transition-all ' >Home</li>
            {/* <div className="text-black hover:text-blue-500 bg-orange-200 transition-colors duration-300"> */}
            <li className='cursor-pointer text-black hover:text-white hover:font-bold transition-all '>Your Tasks</li>
        </ul>
       </nav>
    </div>
  )
}

export default Navbar
