import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { getAllSchedulings, addNewSchedulings, getSchedulingById } from './controllers/cronJob.js'

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
    .get(getAllSchedulings)
    .post(addNewSchedulings)
    .delete('/:jobId', (req, res) => {
        return res.json({
            message: 'Hello world'
        })
    }).get('/:jobId', getSchedulingById)

app.use('/api/v1', schedulingApi)

// Revert on change when restart server
console.log('Restart all scheduling')

// Lanch app
const PORT = process.env.PORT || 8080
app.listen(process.env.PORT || 8080, () =>
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
).on('error', (error) => console.log('Error: ', error))
