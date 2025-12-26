const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('../generated/prisma/client')

require('dotenv').config

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({ adapter })



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