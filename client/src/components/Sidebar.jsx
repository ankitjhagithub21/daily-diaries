import useFetchStories from '../hooks/useFetchStories';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosClose } from 'react-icons/io';

const Sidebar = ({isOpen,setIsOpen}) => {
  useFetchStories()
  const { loading, stories } = useSelector(state=>state.story);
  const navigate = useNavigate()
  
  
  const handleStoryClick = (id) =>{
    navigate(`/stories/${id}`)
    setIsOpen(false)
  }
  const handleClick = () =>{
    navigate("/add")
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
      <button onClick={handleClick} className='bg-blue-500 hover:bg-blue-600 text-white text-md p-2 rounded-lg'>Start Writing</button>
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
                  <div key={story._id} className='bg-gray-200 hover:bg-gray-300 overflow-hidden p-2 rounded-lg my-2 cursor-pointer' onClick={()=>handleStoryClick(story._id)}>{story.title}</div>
                ))}
              </>
            )
          )
        }
      </div>
     
    </div>
  );
}

export default Sidebar;
