const router = require('express').Router()
const authControler = require('../controllers/auth.controller')

router.post('/', authControler.login)

module.exports = router