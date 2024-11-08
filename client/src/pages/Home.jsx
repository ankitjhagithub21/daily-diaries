import React, { useState } from 'react'
import AddStory from './AddStory'
import Sidebar from '../components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import StoryDetails from './StoryDetails'
import WelcomePage from './WelcomePage'
import Navbar from '../components/Navbar'
import EditStory from './EditStory'


const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <main className='flex h-screen w-screen'>


      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

      <div className='h-screen w-full flex flex-col gap-2'>
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <div className='h-screen overflow-y-scroll'>
          <Routes>
            <Route index path="/" element={<WelcomePage />} />
            <Route path="/add" element={<AddStory />} />
            <Route path="/edit/:id" element={<EditStory />} />
            <Route path="/stories/:id" element={<StoryDetails />} />
          </Routes>
        </div>
      </div>


    </main>
  )
}

export default Home
