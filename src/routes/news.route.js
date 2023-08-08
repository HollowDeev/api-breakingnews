const router = require('express').Router()

const newsController = require('../controllers/news.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const {validNews} = require('../middlewares/global.middlewares')

router.post('/', authMiddleware.verify, newsController.create)
router.get('/', newsController.findAll)
router.get('/top', newsController.topNews)
router.get('/search', newsController.searchByTitle)
router.get('/byUser', authMiddleware.verify, newsController.byUser)
router.get('/:id', newsController.findById)
router.patch('/:id', validNews,  authMiddleware.verify, newsController.update)
router.delete('/:id', validNews, authMiddleware.verify, newsController.erase)
router.patch("/like/:id", authMiddleware.verify, newsController.likeNews)
router.patch("/comment/:id", authMiddleware.verify, newsController.addComment)
router.patch("/comment/:newsId/:commentId", authMiddleware.verify, newsController.deleteComment)

module.exports = router