const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const { username, name, password } = request.body

    const userExists = await User.findOne({ username })
    if (userExists) {
        return response.status(400).end("username already exists")
    }

    if (username.length > 2 && password.length > 2) {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
        } else {
            response.status(400).end("username and/or password too short")
        }
    } catch (error) {
        response.status(400).end("username and password are required")
    }
})

module.exports = usersRouter
