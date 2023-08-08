const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const userService = require('../services/user.service')

const verify = (req, res, next) => {

    try{const { authorization } = req.headers

    if (!authorization){
        return res.status(401).send({message: 'missing authorization'})
    }

    const parts = authorization.split(' ')

    const [schema, token] = parts

    if(parts.length != 2){
        return res.status(401).send({message: "authorization headers incomplete"})
    }

    if(schema != 'Bearer') {
        return res.status(401).send({message: 'missing authorization token schema'})
    }


    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
        if(error){
            return res.status(401).send({message: "Token invalid!"})
        } else {

            const user = await userService.findByIdService(decoded.id)

            if(!user || !user.id){
                return res.status(401).send({message: "Token user not found"})
            } else {
                
                req.userId = user.id

                next()
            }

        }
        
    })

    } catch(err) {
        res.status(500).send({message: err.message})
    }
}

module.exports = {
    verify
}
