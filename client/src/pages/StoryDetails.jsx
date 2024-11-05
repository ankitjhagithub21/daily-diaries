import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteStory, getStoryDetails } from '../api/story';
import Loader from './Loader';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { removeStory } from '../redux/slices/storySlice';
import { IoIosTrash } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import BackButton from '../components/BackButton';

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

    const handleDelete = async (id) => {
        if (confirm("Are you sure ?")) {
            try {
                const data = await deleteStory(id);
                if (data.success) {
                    toast.success(data.message)
                    dispatch(removeStory(id))
                    navigate("/")
                } else {
                    toast.error(data.error)
                }

            } catch (error) {
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
            <div className='flex items-center justify-between  px-5  top-0 w-full'>
              <BackButton/>
                <div>
                    <button onClick={() => navigate(`/edit/${data._id}`)} className='bg-green-500 mx-2 text-white pl-3 pr-2 py-2 rounded-full hover:bg-green-600'>
                        <FaEdit size={20} />
                    </button>
                    <button onClick={() => handleDelete(data._id)} className='bg-red-500 text-white p-2 rounded-full hover:bg-red-600'>
                        <IoIosTrash size={20} />
                    </button>
                </div>
            </div>
            <div className='p-5 max-w-7xl mx-auto'>
                <p className='mb-5'>Date : {data.createdAt.slice(0, 10)}</p>
                <h1 className='font-bold text-2xl mb-5'>{data?.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: data?.story }} />
            </div>
        </div>
    )
}

export default StoryDetails
