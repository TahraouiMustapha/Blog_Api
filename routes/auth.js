const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/auth')

// POST "/api/auth/profile" login
authRouter.post('/profile',
    authController.authenticate
)

// POST "/api/auth/logout" logout
authRouter.post('/logout', (req, res) => {
    return res.status(200).json({ message: "OK" });
});

module.exports = authRouter


