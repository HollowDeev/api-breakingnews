const newsService = require('../services/news.service')

const create = async (req, res) => {

    try{
        const {title, text, banner} = req.body

        if(!title || !text || !banner ){
            res.status(400).send( {message:"Submit all fields for registration"} )
        } 

        await newsService.createService({
            title, text, banner, id: "objectIdFake"
        })

        res.status(201).send("criar noticia")
        
    }catch(err) {
        res.status(500).send({message: err.message})
    }


}

const findAll = async (req, res) => {

    res.status(201).send("noticias")

}

module.exports = {
    create,
    findAll
}