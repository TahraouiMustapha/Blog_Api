const postsModel = require('../models/posts')
const CustomError = require('../errors/CustomError')


const getAllPosts = async (req, res) => {
    const posts = await postsModel.getAllPosts()
    return res.json({
        posts
    })
}

const getPost = async (req, res) => {
    const { postId } = req.params

    if (typeof postId !== 'number' && isNaN(postId)) {
        throw new CustomError(400, "Invalid postId")
    }

    const post = await postsModel.getPostById(Number(postId))

    if (!post) {
        throw new CustomError(404, "Post not found")
    }

    return res.json({
        post: post
    });
}

const getCommentsUnderPost = async (req, res) => {
    const { postId } = req.params

    if (typeof postId !== 'number' && isNaN(postId)) {
        throw new CustomError(400, "Invalid postId")
    }

    const comments = await postsModel.getCommentsUnderPost(Number(postId))

    return res.json({
        comments
    });
}

module.exports = {
    getAllPosts,
    getPost,
    getCommentsUnderPost
}
