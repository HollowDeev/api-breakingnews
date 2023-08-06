const express = require('express')
const app = express()
const connectDatabase = require('./src/database/db')
const dotenv = require('dotenv').config()

const authRoute = require('./src/routes/auth.route')
const userRoute = require('./src/routes/user.route')

const port = process.env.PORT || 3333

connectDatabase()
app.use(express.json())
app.use('/user', userRoute)
app.use('/auth', authRoute)

app.listen(port, () => console.log(`Servidor Online na porta ${port}`)
)
