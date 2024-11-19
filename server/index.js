import express from 'express'
import dotenv from 'dotenv'
import { sequelize } from './db.js'
import cors from 'cors'
import models from './models/models.js'
import errorHandler from './middleware/ErrorHandler.js'
import userRouter from './api/user.routes.js'
import catalogRouter from './api/catalog.routes.js'
import goodsRouter from './api/goods.router.js'
import basketRouter from './api/basket.router.js'
import likedRouter from './api/liked.router.js'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

dotenv.config()

const PORT = process.env.PORT || 5000
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload())
app.use(cors())
app.use('/api', userRouter)
app.use('/api', catalogRouter)
app.use('/api', goodsRouter)
app.use('/api', basketRouter)
app.use('/api', likedRouter)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server was started on port: ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()
