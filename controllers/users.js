const bcrypt = require('bcryptjs')
const usersModel = require('../models/users')
const { validationResult } = require('express-validator')



const registerNewUser = async (req, res) => {
    const errors = validationResult(req)
    const { username, password } = req.body

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // create new user 
    await usersModel.createUser({ username, password: hashedPass })
    return res.status(201).json({
        message: "User registred successfully"
    })
}

module.exports = {
    registerNewUser
}