const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/auth')

// POST "/api/auth/profile" login
authRouter.post('/profile',
    authController.authenticate
)

module.exports = authRouter


