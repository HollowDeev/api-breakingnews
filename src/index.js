const express = require('express')
const app = express()
const connectDatabase = require('./database/db')
const dotenv = require('dotenv').config()

const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const newsRoute = require('./routes/news.route')
const swaggerRoute = require('./routes/swegger.route')

const port = process.env.PORT || 3333

connectDatabase()
app.use(express.json())
app.use('/user', userRoute)
app.use('/auth', authRoute)
app.use('/news', newsRoute)
app.use('/doc', swaggerRoute)

app.listen(port, () => console.log(`Servidor Online na porta ${port}`)
)
