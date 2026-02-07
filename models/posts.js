
const prisma = require('./prismaClientInstance')


const getAllPosts = function () {
    return prisma.post.findMany()
}

const getPostById = function (postId) {
    return prisma.post.findUnique({
        where: {
            postId: postId
        }
    })
}

const getCommentsUnderPost = function (postId) {
    return prisma.comment.findMany({
        where: {
            postId: postId
        }
    })
}

const createPost = function ({ title, date, published, text, thumbnailUrl, authorId }) {
    return prisma.post.create({
        data: {
            title,
            date,
            published,
            text,
            thumbnailUrl,
            author: {
                connect: {
                    userId: authorId
                }
            }
        },
    })
}

const createComment = function ({
    username,
    date,
    text,
    authorId,
    postId
}) {
    return prisma.comment.create({
        data: {
            username,
            date,
            text,
            author: {
                connect: {
                    userId: authorId
                }
            },
            post: {
                connect: {
                    postId: postId
                }
            }
        }
    })
}

module.exports = {
    getAllPosts,
    getPostById,
    getCommentsUnderPost,
    createPost,
    createComment
}



