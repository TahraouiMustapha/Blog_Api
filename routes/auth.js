const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/auth')

// POST "/api/auth" login
authRouter.post('/',
    authController.authenticate
)

module.exports = authRouter


