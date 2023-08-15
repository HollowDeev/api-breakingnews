const News = require('../models/News')

const createService = (body) => News.create(body)

const findService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user")

const countNews = () => News.countDocuments()

const topNewsService = () => News.findOne().sort({_id: -1}).populate("user")

const findByIdService = (id) => News.findById(id).populate('user')

const searchByTitleService = (title) => News.find({
    title: {
        $regex: `${title}`, 
        $options: "i"
    }
}).sort({_id: -1}).populate('user')

const byUserService = (id) => News.find({user: id}).sort({_id: -1}).populate("user")

const updateService = (id, title, text, banner) => News.findOneAndUpdate({_id: id}, {title, text, banner}, {rawResult: true})

const eraseService = (id) => News.findByIdAndDelete(id)

const likeNewsService = (newsId, userId) => News.findOneAndUpdate(
    {_id: newsId, "likes.userId": {$nin: [userId]}}, 
    {$push: {likes: {userId, createdAt: new Date()} }}
)

const deleteLikeNewsService = (newsId, userId) => 
    News.findOneAndUpdate(
        {_id: newsId},
        {$pull: {likes: {userId} }}
    )

const addCommentService = (newsId, userId, comment) => {

    const commentId = Math.floor(Date.now() * Math.random()).toString(36) 

    return News.findOneAndUpdate({_id: newsId}, {$push: {comments: {commentId, userId, comment, createdAt: new Date() }}})
}

const deleteCommentService = (newsId, userId, commentId) =>
    News.findOneAndUpdate(
        {_id: newsId},
        {$pull: {comments: {userId, commentId} }}
    )

module.exports = { 
    createService,
    findService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    eraseService,
    likeNewsService,
    deleteLikeNewsService,
    addCommentService,
    deleteCommentService
} 