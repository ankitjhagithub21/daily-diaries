import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStoryDetails } from '../api/story';
import Loader from '../pages/Loader';

const StoryDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchStory = async () => {
            try {
                setLoading(true)
                const data = await getStoryDetails(id)
                if (data.success) {
                    setData(data.story)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        fetchStory()
    }, [id])

    if (loading) {
        return <Loader/>
    }
    if (!data) {
        return <p>Story not found</p>
    }
    return (
        <div className='p-5'>
            <h1 className='font-bold text-2xl mb-5'>{data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data?.story }} />
        </div>
    )
}

export default StoryDetails
