const express = require('express')
const postsRouter = express.Router()

// import controllers
const postsController = require('../controllers/posts')

// GET "/api/posts"
postsRouter.get('/', postsController.getAllPosts)

// GET "/api/posts/:postId"
postsRouter.get('/:postId', postsController.getPost)

// GET "/api/posts/:postId/comments"
postsRouter.get('/:postId/comments', postsController.getCommentsUnderPost)

// POST "/api/posts/:postId/comments" create comment 
postsRouter.post('/:postId/comments', (req, res) => res.json({ message: "we want to create a comment" }))



module.exports = postsRouter