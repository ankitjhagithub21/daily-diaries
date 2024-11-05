
import { FaBars } from "react-icons/fa";

const Navbar = ({setIsOpen}) => {
  return (
    <nav className='p-4 bg-white'>
      <button onClick={()=>setIsOpen(true)}>
        <FaBars/>
      </button>
    </nav>
  )
}

export default Navbar
