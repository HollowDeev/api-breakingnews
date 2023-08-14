const router = require('express').Router()

const newsController = require('../controllers/news.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const {validNews} = require('../middlewares/global.middlewares')

router.get('/:id', newsController.findById)
router.get('/', newsController.findAll)
router.get('/top', newsController.topNews)
router.get('/search', newsController.searchByTitle)

router.use(authMiddleware.verify)
router.post('/', newsController.create)
router.get('/byUser', newsController.byUser)

router.use(validNews)
router.patch('/:id', newsController.update)
router.delete('/:id', newsController.erase)
router.patch("/like/:id", newsController.likeNews)
router.patch("/comment/:id", newsController.addComment)
router.patch("/comment/:newsId/:commentId", newsController.deleteComment)

module.exports = router