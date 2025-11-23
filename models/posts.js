
const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('../generated/prisma/client')

require('dotenv').config

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

async function newUser() {

    try {
        const newUser = await prisma.user.create({
            data: {
                userId: 2,
                username: 'ahmad',
                password: 'kamal',
                role: 'Reader'
            }
        })
        return newUser;

    } catch (err) {
        console.log(err)
        return null
    }
}


module.exports = {
    newUser
}



