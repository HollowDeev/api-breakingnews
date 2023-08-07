const router = require('express').Router()

const newsController = require('../controllers/news.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware.verify, newsController.create)
router.get('/', newsController.findAll)
router.get('/top', newsController.topNews)
router.get('/search', newsController.searchByTitle)
router.get('/byUser', authMiddleware.verify, newsController.byUser)
router.get('/:id', newsController.findById)

module.exports = router