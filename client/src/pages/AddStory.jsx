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

    const handleSubmit = async (e) => {
        e.preventDefault()
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
           <BackButton/>
            <p className='my-5'>
                {new Date().toLocaleString()}
            </p>

            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Write your title here...' className='text-3xl outline-none w-full mb-5 p-2' required />
                <JoditEditor
                    ref={editor}
                    value={story}
                    config={{
                        height: "65vh"
                    }}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newStory => setStory(newStory)}

                />
                <button type='submit' disabled={loading} className='bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 mt-5'>
                    {
                        loading ? 'Publishing...' : 'Publish'
                    }
                </button>
            </form>
        </div>
    )
}

export default AddStory
