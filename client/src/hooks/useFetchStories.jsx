import { useEffect} from 'react'
import { getAllStories } from '../api/story'
import { useDispatch} from 'react-redux'
import { setLoading, setStories } from '../redux/slices/storySlice'

const useFetchStories = () => {
    
    const dispatch = useDispatch()
    useEffect(() => {
        const getData = async() => {
            try {
                const data = await getAllStories();
                if(data.success){
                    dispatch(setStories(data.stories))
                }else{
                    dispatch(setStories([]))
                }
            } catch (error) {
                console.log(error)
            } finally {
                dispatch(setLoading(false))
            }
        }
        getData()
    }, [])
  
}

export default useFetchStories
