const bcrypt = require('bcryptjs')
const usersModel = require('../models/users')
const { validationResult } = require('express-validator')
const CustomResponse = require('../utils/customResponse')



const registerNewUser = async (req, res) => {
    const errors = validationResult(req)
    const { username, password } = req.body

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // create new user 
    await usersModel.createUser({ username, password: hashedPass })

    const response = new CustomResponse(true, 'User registred successfully', {})
    return res.status(200).json(response)
}

const getAuthenticatedUser = async (req, res) => {
    const userPayload = req.user;


    const user = await usersModel.getUserByUsername(userPayload.username)

    const { password, ...safeUser } = user

    const response = new CustomResponse(true, '', { user: safeUser })
    return res.status(200).json(response)
}

module.exports = {
    registerNewUser,
    getAuthenticatedUser
}