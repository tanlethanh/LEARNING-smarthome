import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import * as cronJob from './providers/cronJob.js'

const app = express()

dotenv.config()

// Cors setup
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(bodyParser.json())

// Database setup
mongoose.set('strictQuery', false)

mongoose.connect(process.env.DB_URI).then((conn) => {
    return console.log('Database connected')
}).catch((error) => {
    console.log('Database connection fail', error)
})

// API Route

const schedulingApi = express.Router('/scheduling')

schedulingApi
    .get((req, res) => {
        return res.json({
            message: 'Hello world'
        })
    })
    .post((req, res) => {
        return res.json({
            message: 'Hello world'
        })
    })
    .delete('/:jobId', (req, res) => {
        return res.json({
            message: 'Hello world'
        })
    }).get('/:jobId', (req, res) => {
        return res.json({
            message: 'Hello world'
        })
    })

app.use('/api/v1', schedulingApi)

// Lanch app
const PORT = process.env.PORT || 8080
app.listen(process.env.PORT || 8080, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
).on('error', (error) => console.log('Error: ', error))
