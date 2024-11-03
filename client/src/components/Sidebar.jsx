import React from 'react';
import useFetchStories from '../hooks/useFetchStories';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { loading, stories } = useFetchStories();
  const navigate = useNavigate()

  return (
    <div className='flex flex-col p-3 md:w-1/4 w-fit'>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          stories.length === 0 ? (
            <p>No story found</p>
          ) : (
            <>
              {stories.map((story) => (
                <div key={story._id} className='bg-gray-200 hover:bg-gray-300 text-sm p-2 rounded-lg my-1 cursor-pointer' onClick={()=>navigate(`/stories/${story._id}`)}>{story.title.slice(0,30)}</div>
              ))}
            </>
          )
        )
      }
    </div>
  );
}

export default Sidebar;
