const express = require('express')
const userRoute = require('./src/routes/user.route')
const app = express()

app.use('/user', userRoute)

app.listen(3333)
console.log('Servidor Online')