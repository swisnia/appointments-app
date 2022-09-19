import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import morgan from 'morgan'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const app = express()
dotenv.config()
//security
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit'


//middleware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import authenticateUser from './middleware/auth.js'

//routers
import authRouter from './routes/authRoutes.js'
import firmRouter from './routes/firmRoutes.js'



if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.resolve(__dirname, './client/build')))
app.use(express.json({limit: '50mb'}))
app.use(helmet()) //secure headers
app.use(xss()) //sanitize input
app.use(mongoSanitize()) //prevent mongoDB injection

//limit request'ów
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many request from this IP adress, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false
})
app.use(limiter) 

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/firm',  firmRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

//musi byc ponizej wszystkich sciezek 
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server listening at port ${port}...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
