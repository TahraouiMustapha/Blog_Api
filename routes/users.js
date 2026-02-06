const express = require('express');
const usersRouter = express.Router();

const { body } = require('express-validator');
const usersController = require('../controllers/users')
const { verifyAuth } = require('../controllers/auth')


const validateUserCredentials = [
    body('username')
        .trim()
        .isEmail()
        .withMessage('Invalid email address')
    ,
    body('password')
        .isLength({ min: 8, max: 16 }).withMessage('Password must be 8-16 characters long')

]

// POST  "/api/users" 
usersRouter.post("/", validateUserCredentials, usersController.registerNewUser)

// POST "/api/users/me"
usersRouter.post("/me", verifyAuth, usersController.getAuthenticatedUser)

module.exports = usersRouter


