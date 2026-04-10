const express = require('express')
const adminRouter = express.Router()

// controllers
const authController = require('../controllers/auth')
const postContorller = require('../controllers/posts')


// POST /api/admin/auth (login)
adminRouter.post('/auth',
    authController.authenticate('Admin')
)

// POST /api/admin/posts
// create a post

// publish and unpublish (posts)
// PATCH /api/admin/posts/:postId
adminRouter.patch('/posts/:postId',
    authController.verifyAuth,
    authController.isAdmin,
    postContorller.changePublishedState
)

// DELETE /api/admin/comments/:commentId
// delete comment



module.exports = adminRouter;