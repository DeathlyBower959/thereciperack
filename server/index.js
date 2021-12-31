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
import urlsRoute from './routes/urls.js'
import emailRoute from './routes/email.js'
import bodyParser from 'body-parser'

// Express App Setup
const app = express()
app.use(express.json({ limit: '25mb' }))
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }))
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Online!')
})

app.use('/urls', urlsRoute)
app.use('/users', userRoutes)
app.use('/cookbook', cookbookRoutes)
app.use('/recipe', recipeRoutes)
app.use('/shopping', shoppingRoute)
app.use('/settings', settingRoute)
app.use('/email', emailRoute)

// MongoDB Connection
try {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
} catch (err) {
    console.log('Failed to connect to database')
    process.exit(1)
}

const PORT = isNaN(process.env.PORT) ? 5000 : process.env.PORT
app.listen(PORT, () => {
    console.log('Server online on port: ' + PORT)
})
