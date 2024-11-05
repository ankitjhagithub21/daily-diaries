import useFetchStories from '../hooks/useFetchStories';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { IoIosClose } from 'react-icons/io';

const Sidebar = ({isOpen,setIsOpen}) => {
  useFetchStories()
  const { loading, stories } = useSelector(state=>state.story);
  const navigate = useNavigate()
  const dispatch = useDispatch()
 

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

  const handleStoryClick = (id) =>{
    navigate(`/stories/${id}`)
    setIsOpen(false)
  }
  return (
    <div className={`flex absolute ${isOpen ? 'md:w-1/4 w-full':'hidden'} lg:relative  h-screen trnasition duration-500 flex-col justify-between p-3  bg-white top-0 z-50`}>
      <div className='flex items-center justify-between mb-5'>
        <h2 className='text-xl font-bold'>Your stories</h2>
        <button  onClick={() => setIsOpen(false)}>
          <IoIosClose size={30}/>
        </button>
      </div>
      <div className='h-full overflow-y-scroll'>
        {
          loading ? (
            <p>Loading...</p>
          ) : (
            stories.length === 0 ? (
              <p>No story found</p>
            ) : (
              <>
                {stories.map((story) => (
                  <div key={story._id} className='bg-gray-200 hover:bg-gray-300 text-sm p-2 rounded-lg my-1 cursor-pointer' onClick={()=>handleStoryClick(story._id)}>{story.title.slice(0, 30)}</div>
                ))}
              </>
            )
          )
        }
      </div>
      <button onClick={handleLogout} className='bg-red-500 text-white rounded-lg p-2 text-sm'>Logout</button>
    </div>
  );
}

export default Sidebar;
