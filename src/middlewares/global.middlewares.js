const userService = require('../services/user.service')
const newsService = require('../services/news.service')
const mongoose = require('mongoose')

const validId = (req, res, next) => {
    try{const id = req.params.id 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send({message: "Invalid ID"})
    }

    next()}
    catch(err) {
        res.status(500).send({message: err.message})
    }
}

const validUser = async (req, res, next) => {
    try{const id = req.params.id 

    const user = await userService.findByIdService(id)

    if(!user){
        return res.status(400).send({message: "User not found"})
    }

    req.id = id
    req.user = user

    next()}
    catch(err) {
        res.status(500).send({message: err.message})
    }
}

const validNews = async (req, res, next) => {
    try {

        const id = req.params.id

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({message: "Invalid ID"})
        }

        const news = await newsService.findByIdService(id)

        if(news === null){
           return res.status(400).send({message: `News not found ${id}`})
        } else {
            next()
        }


    }catch(err) {
        res.status(500).send({message: err.message})
    }
}

module.exports = {
    validId,
    validUser,
    validNews
}