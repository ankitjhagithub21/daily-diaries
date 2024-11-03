import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';
import { addStory } from '../api/story';

const AddStory = () => {
    const editor = useRef(null);
    const [title, setTitle] = useState('')
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const toastId = toast.loading("Processing your data...")
        try {
            const data = await addStory({ title, story })
            if (data.success) {
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
        <div className='p-5'>

            <p className='mb-5'>
                {new Date().toLocaleString()}
            </p>

            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='text-3xl outline-none w-full mb-5 p-2' required />
                <JoditEditor
                    ref={editor}
                    value={story}
                    config={{
                        height: "100" 
                    }}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={newStory => setStory(newStory)}
          
                />
                <button type='submit' disabled={loading} className='bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 mt-5'>
                    {
                        loading ? 'Publishing...' :'Publish'
                    }
                </button>
            </form>
        </div>
    )
}

export default AddStory
