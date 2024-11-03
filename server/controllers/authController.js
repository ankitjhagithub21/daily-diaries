const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SEC, { expiresIn: "1d" })
}

const register = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }

        let user = await User.findOne({ username })

        if (user) {
            return res.status(400).json({ success: false, message: "Username already taken." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            username,
            password: hashedPassword
        })

        const savedUser = await user.save();

        const token = generateToken(savedUser._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000
        }).status(201).json({
            success: true,
            message: "Account created.",
            username: savedUser.username
        })


    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }

}

const login = async (req, res) => {
    try {
        
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." })
        }

        let user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." })
        }

        const validPassword = await bcrypt.compare(password, user.password);

       
        if (!validPassword) {
            return res.status(400).json({ success: false, message: "Wrong credentials." })
        }

        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000
        }).status(200).json({
            success: true,
            message: `Welcome back ${user.username}`,
            username: user.username
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }

}

const logout = async (req, res) => {
    try {

       return res.cookie('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0
        }).status(200).json({
            success: true,
            message: "Logout successfull.",
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }

}


const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if(!user){
            return res.status(404).json({success:false,message:"User not found."})
        }
        res.status(200).json({success:true,username:user.username})
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }

}

module.exports = {
    register,
    login,
    logout,
    getUser
}