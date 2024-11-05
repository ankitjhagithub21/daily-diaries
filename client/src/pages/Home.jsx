import React from 'react'
import AddStory from './AddStory'
import Sidebar from '../components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import StoryDetails from './StoryDetails'
import WelcomePage from './WelcomePage'

const Home = () => {
  return (
    <div className='h-screen w-full flex'>
      <Sidebar />
      <div className='overflow-y-scroll h-screen w-full'>
        <Routes>
          <Route index path="/" element={<WelcomePage />} />
          <Route  path="/add" element={<AddStory />} />
          <Route path="/stories/:id" element={<StoryDetails />} />
        </Routes>
      </div>



    </div>
  )
}

export default Home
