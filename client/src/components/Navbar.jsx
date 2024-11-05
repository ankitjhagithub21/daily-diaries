
import { FaBars } from "react-icons/fa";

const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <nav className='p-4 bg-white flex items-center gap-4'>
      
      {
        !isOpen && <button onClick={() => setIsOpen(true)}>
          <FaBars />
        </button>
      }
      <h2 className="text-indigo-500 font-bold text-xl">Daily Diaries</h2>
    </nav>
  )
}

export default Navbar
