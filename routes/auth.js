const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/auth')
const CustomResponse = require('../utils/customResponse')

// POST "/api/auth/profile" login
authRouter.post('/profile',
    authController.authenticate
)

// POST "/api/auth/logout" logout
authRouter.post('/logout',
    authController.verifyAuth,
    authController.logout
);

module.exports = authRouter


