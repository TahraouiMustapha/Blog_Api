
const prisma = require('./prismaClientInstance')


const saveRefreshToken = ({ token }) => {
    return prisma.refreshtoken.create({
        data: {
            token
        }
    })
}

const getRefreshToken = ({ token }) => {
    return prisma.refreshtoken.findUnique({
        where: {
            token
        }
    })
}

module.exports = {
    saveRefreshToken,
    getRefreshToken
}