const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/auth')

// POST "/api/auth/profile" login
authRouter.post('/profile',
    authController.authenticate
)

// POST "/api/auth/logout" logout
authRouter.post('/logout',
    authController.verifyAuth,
    authController.logout
);

// POST "/api/auth/refresh" 
authRouter.post('/refresh',
    authController.refresh
)

module.exports = authRouter


