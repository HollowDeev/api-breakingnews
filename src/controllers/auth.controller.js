const bcrypt = require('bcrypt')
const { loginService } = require('../services/auth.service')


const login = async (req, res) => {
    
    try{const { email, password } = req.body 

    const user = await loginService(email)

    if(!user){
        return res.status(404).send({message: "User or password not found"})
    }

    const passwordIsValid = await bcrypt.compare(password, user.password)

    if(!passwordIsValid){
        return res.status(404).send({message: "User or password not found"})
    }

    res.send("Login OK")} catch(err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    login
}