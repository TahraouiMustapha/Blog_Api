const express = require('express')
const postsRouter = express.Router()
const authController = require('../controllers/auth')

// import controllers
const postsController = require('../controllers/posts')

// GET "/api/posts"
postsRouter.get('/', postsController.getAllPosts)

// POST "api/posts"
postsRouter.post('/',
    authController.verifyAuth,
    authController.isAdmin,
    postsController.createPost
)

// GET "/api/posts/:postId"
postsRouter.get('/:postId', postsController.getPost)


// GET "/api/posts/:postId/comments"
postsRouter.get('/:postId/comments', postsController.getCommentsUnderPost)

// POST "/api/posts/:postId/comments" create comment 
postsRouter.post('/:postId/comments',
    authController.verifyAuth,
    postsController.createComment
)



module.exports = postsRouter