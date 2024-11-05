import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { editStory, getStoryDetails } from '../api/story';
import Loader from './Loader';
import BackButton from '../components/BackButton';

const EditStory = () => {
  const editor = useRef(null);
  const [currStory, setCurrStory] = useState(null);
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getStoryDetails(id);
        if (data.success) {
          setCurrStory(data.story);
          setTitle(data.story.title); 
          setStory(data.story.story); 
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error fetching story details");
        console.log(error);
      }finally{
        setLoading(false)
      }
    };
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await editStory({ title, story }, id);
      if (data.success) {
        toast.success(data.message);
        navigate(`/stories/${id}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating story");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!currStory) {
    return <p>Story not found.</p>;
  }

  return (
    <div className="px-5 pb-12 pt-5">
     <BackButton/>
      <p className="my-5">{new Date().toLocaleString()}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write your title here..."
          className="text-3xl outline-none w-full mb-5 p-2"
          required
        />
        <JoditEditor
          ref={editor}
          value={story}
          config={{
            height: "65vh",
          }}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newStory) => setStory(newStory)} // onBlur updates the story
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 mt-5"
        >
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
};

export default EditStory;
