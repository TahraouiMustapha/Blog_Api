const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/auth')
const CustomResponse = require('../utils/customResponse')

// POST "/api/auth/profile" login
authRouter.post('/profile',
    authController.authenticate
)

// POST "/api/auth/logout" logout
authRouter.post('/logout', (req, res) => {

    const response = new CustomResponse(true, 'Log out', {})
    return res.status(200).json(response)
});

module.exports = authRouter


