import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import usersRouter from './routes/usersRoute.js'
import tasksRouter from './routes/tasksRoute.js'
import projectRouter from "./routes/projectRoute.js";
import {authMiddleware} from "./middleware/authMiddleware.js";

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    console.error('MONGO_URI is not set in .env')
    process.exit(1)
}

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/tasks', authMiddleware, tasksRouter)
app.use('/api/projects', authMiddleware, projectRouter)

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('base connected')
        app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`))
    })
    .catch((err: Error) => {
        console.error('Failed to connect db:', err.message)
        process.exit(1)
    })
