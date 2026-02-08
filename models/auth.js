
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

const removeRefreshToken = ({ token }) => {
    return prisma.refreshtoken.deleteMany({
        where: {
            token,
        },
    })

}

module.exports = {
    saveRefreshToken,
    getRefreshToken,
    removeRefreshToken
}