import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
dotenv.config()

// Route Imports
import userRoutes from './routes/users.js'
import cookbookRoutes from './routes/cookbook.js'
import recipeRoutes from './routes/recipe.js'
import shoppingRoute from './routes/shopping.js'
import settingRoute from './routes/settings.js'
import emailRoute from './routes/email.js'

// Express App Setup
const app = express()
app.use(express.json())
app.use(cors())

// Routes
app.use('/users', userRoutes)
app.use('/cookbook', cookbookRoutes)
app.use('/recipe', recipeRoutes)
app.use('/shopping', shoppingRoute)
app.use('/settings', settingRoute)
app.use('/email', emailRoute)

// Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const PORT = isNaN(process.env.PORT) ? 5000 : process.env.PORT
app.listen(PORT, () => {
    console.log('Server online on port: ' + PORT)
})