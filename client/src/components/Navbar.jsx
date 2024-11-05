import React from 'react'

const Navbar = ({setIsOpen}) => {
  return (
    <nav className='p-3 bg-white'>
      <button onClick={()=>setIsOpen(true)}>Open</button>
    </nav>
  )
}

export default Navbar
