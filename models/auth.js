
const prisma = require('./prismaClientInstance')


const saveRefreshToken = ({ token }) => {
    return prisma.refreshtoken.create({
        data: {
            token
        }
    })
}

module.exports = {
    saveRefreshToken
}