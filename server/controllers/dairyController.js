const Dairy = require("../models/Dairy");

const createStory = async (req, res) => {
    try {
        const { title, story } = req.body;

        if (!title || !story) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }

        let newDairy = new Dairy({
            title,
            story,
            userId: req.userId
        })

        const savedDairy = await newDairy.save();

        res.status(201).json({ success: true, message: "Story added.", story: {_id:savedDairy._id,title:savedDairy.title} })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
}

const editStory = async (req, res) => {
    try {
        const { id } = req.params; 
        const story = await Dairy.findByIdAndUpdate(id, req.body, { new: true });

        if (!story) {
            return res.status(404).json({ success: false, message: "Story not found." });
        }

        res.status(200).json({ success: true, message: "Story updated successfully.", story:{_id:story._id,title:story.title} });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};


const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await Dairy.findByIdAndDelete(id);
        if (!story) {
            return res.status(404).json({ success: false, message: "Story not found." })
        }
        res.status(200).json({ success: true, message: "Story deleted." })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
}


const getAllStories = async (req, res) => {
    try {

        const stories = await Dairy.find({ userId: req.userId }).select("title");
        if (!stories) {
            return res.status(404).json({ success: false, message: "No story found." })
        }

        res.status(200).json({ success: true, stories })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
}

const getStoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await Dairy.findById(id);
        if (!story) {
            return res.status(404).json({ success: false, message: "Story not found." })
        }
        res.status(200).json({ success: true, story })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
}



module.exports = {
    createStory,
    deleteStory,
    editStory,
    getAllStories,
    getStoryById
}