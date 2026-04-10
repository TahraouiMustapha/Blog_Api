const express = require('express')
const adminRouter = express.Router()

// controllers
const authController = require('../controllers/auth')
const postContorller = require('../controllers/posts')

// GET /api/admin/posts
adminRouter.get('/posts',
    authController.verifyAuth,
    authController.isAdmin,
    postContorller.getAllPosts
)

// POST /api/admin/auth (login)
adminRouter.post('/auth',
    authController.authenticate('Admin')
)

// POST /api/admin/posts
// create a post

// PATCH /api/admin/posts/:postId
// publish and unpublish (posts)
adminRouter.patch('/posts/:postId',
    authController.verifyAuth,
    authController.isAdmin,
    postContorller.changePublishedState
)

// DELETE /api/admin/comments/:commentId
// delete comment



module.exports = adminRouter;