
const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('../generated/prisma/client')

require('dotenv').config

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })


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



