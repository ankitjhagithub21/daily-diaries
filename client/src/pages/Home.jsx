import React from 'react'
import AddStory from '../components/AddStory'
import Sidebar from '../components/Sidebar'
import { Routes,Route } from 'react-router-dom'
import StoryDetails from '../components/StoryDetails'

const Home = () => {
  return (
    <div className='h-screen w-full flex overflow-y-scroll'>
      <Sidebar />
     <div className='overflow-y-scroll h-screen'>
     <Routes>
        <Route index path="/" element={<AddStory/>}/>
        <Route path="/stories/:id" element={<StoryDetails/>}/>
      </Routes>
     </div>
      
      

    </div>
  )
}

export default Home
