const postsModel = require('../models/posts')
const usersModel = require('../models/users')

const CustomError = require('../errors/CustomError')
const CustomResponse = require('../utils/customResponse')

// cloudinary service 
const { uploadToCloudinary } = require('../services/cloudinary.service')

const getAllPosts = async (req, res) => {

    let posts;
    if (req.user?.role && req.user?.role == 'Admin') {
        posts = await postsModel.getAllPosts()
    } else {
        posts = await postsModel.getPublishedPosts()
    }


    const response = new CustomResponse(true, 'success retreive data', { posts })
    return res.status(200).json(response)
}

const getPostWithComments = async (req, res) => {
    const postId = Number(req.params.postId)

    if (isNaN(postId)) {
        throw new CustomError(400, "Invalid postId")
    }

    const post = await postsModel.getPostWithComments(Number(postId))

    if (!post) {
        throw new CustomError(404, "Post not found")
    }

    const response = new CustomResponse(true, 'success retreive data', { post })
    return res.status(200).json(response)
}


const createPost = async (req, res) => {
    const { title, date, published, text } = req.body
    const { username } = req.user
    const file = req.file;

    if (!file) {
        throw new CustomError(400, 'No file uploaded')
    }

    const result = await uploadToCloudinary(file.buffer)

    const admin = await usersModel.getUserByUsername(username)

    if (!admin) {
        throw new CustomError(400, 'no user found (admin)')
    }

    let post = {
        title,
        published: published === "true",
        text,
        thumbnailUrl: result.secure_url,
        authorId: admin.userId
    }

    if (date) post = { ...post, date }

    await postsModel.createPost(post)

    const response = new CustomResponse(true, 'Create post successfully', {})
    return res.status(200).json(response)
}

const createComment = async (req, res, next) => {
    const { text } = req.body;
    let { postId } = req.params;
    const { id, username } = req.user

    if (!postId || isNaN(Number(postId)) || !Number.isInteger(Number(postId))) {
        const err = new CustomError(400, 'Invalid post id')
        return next(err)
    }

    const comment = {
        username,
        text,
        authorId: Number(id),
        postId: Number(postId)
    }

    // if (date) comment = { ...comment, date } 

    const newComment = await postsModel.createComment(comment)

    const response = new CustomResponse(true, 'Create comment successfully', { comment: newComment })
    return res.status(200).json(response)
}

const changePublishedState = async (req, res) => {
    const postId = Number(req.params.postId)
    const { published } = req.body

    if (isNaN(postId)) {
        throw new CustomError(400, "Invalid postId")
    }

    if (typeof published !== 'boolean') {
        throw new CustomError(400, "Invalid published value")
    }


    const updatedPost = await (published
        ? postsModel.publishPost(Number(postId))
        : postsModel.unpublishPost(Number(postId)))


    const response = new CustomResponse(true, 'Update post successfully', { post: updatedPost })
    return res.status(200).json(response)
}

// DELETE /api/posts/:postId/comments/:commentId
const deleteComment = async (req, res) => {
    const commentId = Number(req.params.commentId)

    if (isNaN(commentId)) {
        throw new CustomError(400, "Invalid commentId")
    }


    await postsModel.deleteComment(commentId)

    const response = new CustomResponse(true, 'Delete comment successfully', {})
    return res.status(200).json(response)
}

module.exports = {
    getAllPosts,
    getPostWithComments,
    createPost,
    createComment,
    changePublishedState,
    deleteComment
}
