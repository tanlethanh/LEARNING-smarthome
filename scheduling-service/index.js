import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

const app = express()

dotenv.config()

// Cors setup
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Database setup
mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB_URI).then((conn) => {
    return console.log('Database connected')
}).catch((error) => {
    console.log('Database connection fail', error)
})

// Lanch app
const PORT = process.env.PORT || 8080
app.listen(process.env.PORT || 8080, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
).on('error', (error) => console.log('Error: ', error))
