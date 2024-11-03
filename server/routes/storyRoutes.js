const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { createStory, deleteStory, getAllStories, getStoryById } = require('../controllers/dairyController')

const storyRouter  = express.Router()


storyRouter.post("/",verifyToken,createStory)
storyRouter.delete("/:id",verifyToken,deleteStory)
storyRouter.get("/",verifyToken,getAllStories)
storyRouter.get("/:id",verifyToken,getStoryById)


module.exports = storyRouter