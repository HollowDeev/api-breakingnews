const newsService = require('../services/news.service')

const create = async (req, res) => {

    try{
        const {title, text, banner} = req.body

        if(!title || !text || !banner ){
            res.status(400).send( {message:"Submit all fields for registration"} )
        } 

        await newsService.createService({
            title, text, banner, user: req.userId
        })

        res.status(201).send({message: "news created successfully"})
        
    }catch(err) {
        res.status(500).send({message: err.message})
    }


}

const findAll = async (req, res) => {

    try{let { limit, offset } = req.query
    limit = Number(limit)
    offset = Number(offset)

    if(!limit){
        limit = 5
    }

    if(!offset){
        offset = 1
    }

    const news = await newsService.findService(offset, limit)
    const total = await newsService.countNews()
    const currentURL = req.baseUrl

    const next = offset + limit 
    const nextURL = next < total ? `${currentURL}?limit=${limit}&offset${next}` : null
    

    if(news.length === 0){
        return res.status(400).send({ message: "There are no registered news"})
    }

    res.status(201).send({
        nextURL,
        limit,
        offset,
        total,

        results: news.map(newsItem => ({
            id: newsItem._id,
            title: newsItem.title,
            text: newsItem.text,
            banner: newsItem.banner,
            likes: newsItem.likes,
            comments: newsItem.comments,
            name : newsItem.user.name,
            username: newsItem.user.username,
            userAvatar: newsItem.user.avatar
        }))
    })}catch(err) {
        res.status(500).send({message: err.message})
    }

}

const topNews = async (req, res) => {

    try{
        
        const news = await newsService.topNewsService()

        if(!news){
            return res.status(400).send({message: "There is no registered post"})
        }

        
        res.status(200).send({
            new: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name : news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar
            }
        })

    }catch(err) {
        res.status(500).send({message: err.message})
    }
    
}

const findById = async (req, res) => {

    try { 
        
        const id = req.params.id
        
        const news = await newsService.findByIdService(id)

        res.status(200).send({
            new: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name : news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar
            }
        })

    }catch(err) {
        res.status(500).send({message: err.message})
    }
}

const searchByTitle = async (req, res) => {
    try {

        const { title } = req.query

        const news = await newsService.searchByTitleService(title)

        if(news.lenght === 0 ) {
            return res.status(400).send({message: "There are no news with this title"})
        }

        res.status(200).send({
            totalOfResults: news.length,
            results: news.map(newsItem => ({
                id: newsItem._id,
                title: newsItem.title,
                text: newsItem.text,
                banner: newsItem.banner,
                likes: newsItem.likes,
                comments: newsItem.comments,
                name : newsItem.user.name,
                username: newsItem.user.username,
                userAvatar: newsItem.user.avatar
            }))
        })

    }catch(err) {
        res.status(500).send({message: err.message})
    }
}

const byUser = async (req, res) => {
  try{

    const id = req.userId

    const news = await newsService.byUserService(id)

    res.status(200).send({
        totalOfResults: news.length,
        results: news.map(newsItem => ({
            id: newsItem._id,
            title: newsItem.title,
            text: newsItem.text,
            banner: newsItem.banner,
            likes: newsItem.likes,
            comments: newsItem.comments,
            name : newsItem.user.name,
            username: newsItem.user.username,
            userAvatar: newsItem.user.avatar
        }))
    })

  }catch(err) {
        res.status(500).send({message: err.message})
  }
}

const update = async (req, res) => {
    try {

        const { title, text, banner } = req.body 
        const id = req.params.id

        if(!title && !banner && !text){
           res.status(400).send({message: "Submit at least one field to update the post"})
        }

        const news = await newsService.findByIdService(id)

        if(news.user.id != req.userId){
            res.status(400).send({message: "You didn't update this post"})
        } 

        await newsService.updateService(id, title, text, banner)

        return res.send({message: "Post successfully updated!"})

    }catch(err) {
        res.status(500).send({message: err.message})
    }
}

const erase = async (req, res) => {
    try {
        const id = req.params.id

        const news = await newsService.findByIdService(id)

        if(news.user.id != req.userId){
            res.status(400).send({message: "You didn't delete this post"})
        } 

        await newsService.eraseService(id)

        return res.status(200).send({message: "News delete successfully"})

    }catch(err) {
        res.status(500).send({message: err.message})
    }
}

const likeNews = async (req,res) => {
    try {

        const newsId = req.params.id
        const userId = req.userId

        const newsLiked = await newsService.likeNewsService(newsId, userId)

        if(!newsLiked){
            await newsService.deleteLikeNewsService(newsId, userId)

            return res.status(200).send({message: "Like successfully removed"})
        }

        return res.status(200).send({message: "Like done successfully"})

    }catch(err) {
        res.status(500).send({message: err.message})
    }
}

const addComment = async (req, res) => {

    try{

        const newsId = req.params.id 
        const userId = req.userId
        const { comment } = req.body

        if(!comment){
            return res.status(400).send({message: "Write a message to comment"})
        }

        await newsService.addCommentService(newsId, userId, comment)

        return res.status(200).send({message:"Comment successfully completed"})

    }catch(err) {
        res.status(500).send({message: err.message})
    }
}


const deleteComment = async (req, res) => {

    try{

        const { newsId, commentId } = req.params
        const userId = req.userId

        const news = await newsService.deleteCommentService(newsId, userId, commentId)

        const commentToDelete = news.comments.find(comment => comment.commentId == commentId)

        if(commentToDelete.userId != userId){
            return res.status(400).send({message: "You didn't delete this comment"})
        }

        return res.status(200).send({message:"Comment successfully removed"})

    }catch(err) {
        res.status(500).send({message: err.message})
    }
}

module.exports = {
    create,
    findAll,
    topNews,
    findById,
    searchByTitle,
    byUser,
    update,
    erase,
    likeNews,
    addComment,
    deleteComment
}