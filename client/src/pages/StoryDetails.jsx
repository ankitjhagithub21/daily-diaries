import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteStory, getStoryDetails } from '../api/story';
import Loader from './Loader';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { removeStory } from '../redux/slices/storySlice';
import { IoIosArrowBack, IoIosTrash } from "react-icons/io";

const StoryDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
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

    const handleDelete = async(id) => {
       if(confirm("Are you sure ?")){
        try{
            const data = await deleteStory(id);
            if(data.success){
                toast.success(data.message)
                dispatch(removeStory(id))
                navigate("/")
            }else{
                toast.error(data.error)
            }
            
        }catch(error){
            console.log(error)
            toast.error("Something went wrong.")
        }
       }
    }

    if (loading) {
        return <Loader />
    }
    if (!data) {
        return <p>Story not found</p>
    }
    return (
        <div className='relative'>
            <div className='flex items-center justify-between  p-3 fixed z-10  top-0 w-full'>
                <button onClick={() => navigate("/")} className='px-4 flex items-center gap-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600'>
                <IoIosArrowBack />
                    back</button>
                <button onClick={()=>handleDelete(data._id)} className='bg-red-500 text-white p-2 rounded-lg hover:bg-red-600'>
                    <IoIosTrash size={20}/>
                </button>
            </div>
            <div className='p-5'>
            <p className='mb-5'>Date : {data.createdAt.slice(0,10)}</p>
            <h1 className='font-bold text-2xl mb-5'>{data?.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data?.story }} />
            </div>
        </div>
    )
}

export default StoryDetails
