const router = require('express').Router()
const userController = require('../controllers/user.controller')

const {validId, validUser} = require('../middlewares/global.middlewares')

const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', userController.create)
router.get('/',  userController.findAll)
router.get('/:id', validId, validUser, userController.findById)
router.patch('/', authMiddleware.verify, userController.update)


module.exports = router