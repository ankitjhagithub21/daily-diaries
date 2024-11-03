import React from 'react';
import useFetchStories from '../hooks/useFetchStories';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const { loading, stories } = useFetchStories();
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

  return (
    <div className='flex absolute lg:relative flex-col justify-between p-3  md:w-1/4 w-full  bg-white h-screen top-0 z-50'>
      <h2 className='text-xl font-bold'>Your stories</h2>
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
                  <div key={story._id} className='bg-gray-200 hover:bg-gray-300 text-sm p-2 rounded-lg my-1 cursor-pointer' onClick={() => navigate(`/stories/${story._id}`)}>{story.title.slice(0, 30)}</div>
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
