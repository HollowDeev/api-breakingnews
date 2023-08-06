const newsService = require('../services/news.service')

const create = async (req, res) => {

    try{
        const {title, text, banner} = req.body

        if(!title || !text || !banner ){
            res.status(400).send( {message:"Submit all fields for registration"} )
        } 

        await newsService.createService({
            title, text, banner, user:"64ce863383adf025bcc91f1f"
        })

        res.status(201).send("criar noticia")
        
    }catch(err) {
        res.status(500).send({message: err.message})
    }


}

const findAll = async (req, res) => {

    const news = await newsService.findAllService()

    if(news.length === 0){
        return res.status(400).send({ message: "There are no registered news"})
    }

    res.status(201).send(news)

}

module.exports = {
    create,
    findAll
}