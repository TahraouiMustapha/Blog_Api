const express = require('express')
const adminRouter = express.Router()

const authController = require('../controllers/auth')

// POST /api/admin/auth (login)
adminRouter.post('/auth',
    authController.authenticate('Admin')
)

module.exports = adminRouter;