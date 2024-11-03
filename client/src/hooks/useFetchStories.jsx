import { useEffect, useState } from 'react'
import { getAllStories } from '../api/story'

const useFetchStories = () => {
    const [loading,setLoading] = useState(true)
    const [stories,setStories] = useState([])
    useEffect(() => {
        const getData = async() => {
            try {
                const data = await getAllStories();
                if(data.success){
                    setStories(data.stories)   
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])
    return {loading,stories}
}

export default useFetchStories
