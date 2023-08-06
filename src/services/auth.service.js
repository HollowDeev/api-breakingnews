const User = require('../models/User')

const loginService = (email) => 
    User.findOne({email: email}).select("+password")

module.exports = {
    loginService
}
