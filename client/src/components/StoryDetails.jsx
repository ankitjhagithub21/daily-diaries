import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStoryDetails } from '../api/story';

const StoryDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchStory = async () => {
            try {

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
        return <p>Loading...</p>
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
