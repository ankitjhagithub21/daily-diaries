require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connection')
const authRouter = require('./routes/authRoutes')
const storyRouter = require('./routes/storyRoutes')
const app = express()
const port = process.env.PORT || 5000

connectDB()


app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN,
  credentials:true
}))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({message:"Api working."})
})


app.use("/api/auth",authRouter)
app.use("/api/stories",storyRouter)


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})