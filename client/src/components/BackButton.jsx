import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate("/")} className='px-4 flex items-center gap-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600'>
            <IoIosArrowBack />
            back</button>
    )
}

export default BackButton
