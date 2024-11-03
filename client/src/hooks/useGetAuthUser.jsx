import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAuthUser } from '../api/auth'
import { setLoading, setUser } from '../redux/slices/authSlice'

const useGetAuthUser = () => {
    

    const dispatch = useDispatch()
    
    useEffect(() => {
        const getUserFromServer = async() => {
            dispatch(setLoading(true))
            try{
                const data = await getAuthUser();

                if(data.success){
                    dispatch(setUser(data.username))
                }else{
                    dispatch(setUser(null))
                }
                
            }catch(error){
                console.log(error)
            }finally{
                dispatch(setLoading(false))
            }
        }
        getUserFromServer()
    }, [])
}

export default useGetAuthUser
