const postsModel = require('../models/posts')
const CustomError = require('../errors/CustomError')
const CustomResponse = require('../utils/customResponse')

// cloudinary service 
const { uploadToCloudinary } = require('../services/cloudinary.service')

const getAllPosts = async (req, res) => {
    const posts = await postsModel.getAllPosts()

    const response = new CustomResponse(true, 'success retreive data', { posts })
    return res.status(200).json(response)
}

const getPostWithComments = async (req, res) => {
    const { postId } = req.params

    if (typeof postId !== 'number' && isNaN(postId)) {
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
    const { id } = req.user
    const file = req.file;

    const result = await uploadToCloudinary(file.buffer)

    let post = {
        title,
        published,
        text,
        thumbnailUrl: result.secure_url,
        authorId: Number(id)
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

    await postsModel.createComment(comment)

    const response = new CustomResponse(true, 'Create comment successfully', {})
    return res.status(200).json(response)
}

module.exports = {
    getAllPosts,
    getPostWithComments,
    createPost,
    createComment
}
