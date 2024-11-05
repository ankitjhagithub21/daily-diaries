
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { logout } from "../api/auth";

const Navbar = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const data = await logout()
      if (data.success) {
        dispatch(setUser(null))
        toast.success(data.message)
        navigate("/login")
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <nav className='p-4 bg-white flex items-center justify-between gap-4 shadow-lg'>

      <div className="flex items-center gap-4">
        {
          !isOpen && <button onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
        }
        <h2 className="text-blue-500 font-bold text-xl">Daily Diaries</h2>
      </div>
      <button onClick={handleLogout} className='bg-red-500 text-white hover:bg-red-600 rounded-lg p-2 text-sm'>
        <CiLogout size={20}/>
      </button>
    </nav>
  )
}

export default Navbar
