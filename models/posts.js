
const prisma = require('./prismaClientInstance')


const getAllPosts = function () {
    return prisma.post.findMany()
}

const getPostWithComments = function (postId) {
    return prisma.post.findUnique({
        where: {
            postId: postId
        },
        include: {
            comments: true
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
    //date, auto_generated
    text,
    authorId,
    postId
}) {
    return prisma.comment.create({
        data: {
            username,
            // date,
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
    getPostWithComments,
    createPost,
    createComment
}



