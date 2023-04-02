import express from 'express'
import cors from 'cors'

const app = express()

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 8080
app.listen(process.env.PORT || 8080, () =>
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
).on('error', (error) => console.log('Error: ', error))
