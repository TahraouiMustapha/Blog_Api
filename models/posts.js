
const prisma = require('./prismaClientInstance')


const getAllPosts = function () {
    return prisma.post.findMany()
}

const getPublishedPosts = function () {
    return prisma.post.findMany({
        where: {
            published: true
        }
    })
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

const publishPost = function (postId) {
    return prisma.post.update({
        where: {
            postId
        },
        data: {
            published: true
        }
    })
}

const unpublishPost = function (postId) {
    return prisma.post.update({
        where: {
            postId
        },
        data: {
            published: false
        }
    })
}

const deleteComment = function (commentId) {
    return prisma.comment.delete({
        where: {
            commentId
        },
    });
}


module.exports = {
    getAllPosts,
    getPublishedPosts,
    getPostWithComments,
    createPost,
    createComment,
    publishPost,
    unpublishPost,
    deleteComment
}



