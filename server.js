import express from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'
import colors from 'colors'
import connectDB from './config/db.js'
import index from './routes/index.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import morgan from 'morgan'

// connectDB
connectDB()

const app = express()

// Cors
app.use(
  cors({
    origin: 'https://ecommerce-backend-00fl.onrender.com',
    optionsSuccessStatus: 200,
  })
)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// Routes
app.use('/api', index)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.grey.bold
  )
})
