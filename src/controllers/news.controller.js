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

        res.status(201).send("news created successfully")
        
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
        offset = 0
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

module.exports = {
    create,
    findAll,
    topNews,
    findById
}