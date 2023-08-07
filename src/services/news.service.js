const News = require('../models/News')

const createService = (body) => News.create(body)

const findService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user")

const countNews = () => News.countDocuments()

const topNewsService = () => News.findOne().sort({_id: -1}).populate("user")

const findByIdService = (id) => News.findById(id).populate('user')

const searchByTitleService = (title) => News.find({
    title: {
        $regex: `${title || ""}`, 
        $options: "i"
    }
}).sort({_id: -1}).populate('user')

const byUserService = (id) => News.find({user: id}).sort({_id: -1}).populate("user")

module.exports = {
    createService,
    findService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService
}