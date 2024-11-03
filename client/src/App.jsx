import React from 'react'
import "./App.css"
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import useGetAuthUser from './hooks/useGetAuthUser'
import { useSelector } from 'react-redux'
import Loader from './pages/Loader'
const App = () => {
  const {user,loading} = useSelector(state=>state.auth)
  useGetAuthUser()
  if(loading){
    return <Loader/>
  }
  return (
  
    <BrowserRouter>
     <Toaster/>
        <Routes>
          <Route path="*" element={user ? <Home/> : <Login/>}/>
          <Route path="/login" element={user ? <Navigate to={"/"}/> : <Login/>}/>
          <Route path="/register" element={user ? <Navigate to={"/"}/> : <Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
