const route = require('express').Router()
const userController = require('../controllers/user.controller')


route.get("/soma", userController.soma)
route.get('/subtracao', userController.subtracao)

module.exports = route