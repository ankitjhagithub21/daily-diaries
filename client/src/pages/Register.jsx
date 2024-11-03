import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaUserCircle, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';

const Register = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const toastId = toast.loading("Processing your data...")

        try{
            const data = await register({username,password})

            if(data.success){
                toast.success(data.message)
                dispatch(setUser(data.username))
                navigate("/")
            }else{
                toast.error(data.message)
                
            }

        }catch(error){
            toast.error("Something went wrong.")
            console.log(error)
        }finally{
            setLoading(false)
            toast.dismiss(toastId)
        }
    }

    return (
        <div className='h-screen w-full flex items-center justify-center p-5 bg-gray-200'>
            <div className='max-w-sm w-full p-5 rounded-2xl custom-shadow bg-white'>
                <h2 className='text-2xl mb-5 text-gray-800 font-bold'>SIGN UP</h2>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className='bg-gray-100  flex text-gray-800 items-center p-2 gap-2 rounded-lg'>
                        <FaUserCircle />
                        <input type="text" placeholder='USER NAME' value={username} onChange={(e) => setUsername(e.target.value)} className='bg-transparent outline-none w-full' required />
                    </div>
                    <div className='bg-gray-100  flex text-gray-800 items-center p-2 gap-2 rounded-lg'>
                        <FaLock  />
                        <input type="text" placeholder='PASSWORD' value={password} onChange={(e) => setPassword(e.target.value)} className='bg-transparent outline-none w-full ' required />
                    </div>
                    <button type='submit' disabled={loading} className={`${loading ? 'bg-gray-500 cursor-not-allowed':'bg-gray-800 cursor-pointer'} text-white p-2 rounded-lg text-sm tracking-wide`}>Create Account</button>
                </form>
                <p className='text-sm mt-5'>Already have an account ? <Link className='text-red-500 hover:underline' to={"/login"}>Login here</Link></p>
            </div>
        </div>
    )
}

export default Register
