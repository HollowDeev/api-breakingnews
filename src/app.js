const express = require('express')
const connectDatabase = require('./database/db')
const dotenv = require('dotenv').config()
const cors = require('cors')

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const newsRoute = require('./routes/news.route')
const swaggerRoute = require('./routes/swegger.route')

const app = express()

connectDatabase()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_ACESS)  

    res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,DELETE,POST")

    app.use(cors())
    next()
})
app.use(express.json()) 
app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use('/news', newsRoute)
app.use('/doc', swaggerRoute)

module.exports = app