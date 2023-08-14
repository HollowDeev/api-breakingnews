const User = require('../models/User')

const createRepositories = (body) => User.create(body)

const findAllRepositories = () => User.find()

const findByIdRepositories = (id) => User.findById(id)

const findByEmailRepositories = (email) => User.findOne({email: email})

const updateRepositories = (
    id, name, username, email, password, avatar, background
) => User.findOneAndUpdate(
        {_id: id},
        {name, username, email, password, avatar, background}
    )

module.exports = {
    createRepositories,
    findAllRepositories,
    findByIdRepositories,
    findByEmailRepositories,
    updateRepositories
}