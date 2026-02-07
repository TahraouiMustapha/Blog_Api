const prisma = require('./prismaClientInstance')


const createUser = function ({ username, password, role }) {
    return prisma.user.create({
        data: {
            username,
            password,
            role
        }
    })
}

const getUserByUsername = function (username) {
    return prisma.user.findUnique({
        where: {
            username: username
        }
    })
}


module.exports = {
    createUser,
    getUserByUsername
}