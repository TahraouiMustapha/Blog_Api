const express = require('express');
const usersRouter = express.Router();

const { body, validationResult } = require('express-validator');
const usersController = require('../controllers/users')


const validateUserCredentials = [
    body('username')
        .trim()
        .isEmail()
        .withMessage('Invalid email address')
    ,
    body('password')
        .isLength({ min: 8, max: 16 }).withMessage('Password must be 8-16 characters long')
        .matches(/\d/).withMessage('Password must contain at least one number')
]

// POST  "/api/users" 
usersRouter.post("/", validateUserCredentials, usersController.registerNewUser)


module.exports = usersRouter


