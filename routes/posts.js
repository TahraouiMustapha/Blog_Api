const express = require('express')
const postsRouter = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


// import controllers
const authController = require('../controllers/auth')
const postsController = require('../controllers/posts')

// GET "/api/posts"
postsRouter.get('/', postsController.getAllPosts)

// POST "api/posts"
postsRouter.post('/',
    authController.verifyAuth,
    authController.isAdmin,
    upload.single('image'),
    postsController.createPost
)

// GET "/api/posts/:postId" and its comments
postsRouter.get('/:postId', postsController.getPostWithComments)


// POST "/api/posts/:postId/comments" create comment 
postsRouter.post('/:postId/comments',
    authController.verifyAuth,
    postsController.createComment
)



module.exports = postsRouter