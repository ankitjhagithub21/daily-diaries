import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';
import { addStory } from '../api/story';
import { useDispatch } from 'react-redux';
import { addNewStory } from '../redux/slices/storySlice';
import BackButton from '../components/BackButton';

const AddStory = () => {
    const editor = useRef(null);
    const [title, setTitle] = useState('')
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        if(!title || !story){
            return toast.error("Title is required.")
        }
        setLoading(true)

        const toastId = toast.loading("Processing your data...")
        try {
            const data = await addStory({ title, story })
            if (data.success) {
                dispatch(addNewStory(data.story))
                toast.success(data.message)
                setTitle('')
                setStory('')

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error("Something went wrong.")
            console.log(error)
        } finally {
            setLoading(false)
            toast.dismiss(toastId)
        }
    }

    return (
        <div className='px-5 pb-12 pt-5'>
            {console.log("re render")}
            <div className='flex justify-between items-center'>
                <BackButton />
                <button type='submit' disabled={loading} className='bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700' onClick={handleSubmit}>
                    {
                        loading ? 'Publishing...' : 'Publish'
                    }
                </button>
            </div>
            <p className='my-5'>
                {new Date().toLocaleString()}
            </p>

            <div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Write your title here...' className='text-3xl outline-none w-full mb-5 p-2' />
                <JoditEditor
                    ref={editor}
                    value={story}
                    config={{
                        height: "65vh"
                    }}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newStory => setStory(newStory)}

                />

            </div>
        </div>
    )
}

export default AddStory
