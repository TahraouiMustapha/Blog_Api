const prisma = require('../models/prismaClientInstance')
const bcrypt = require('bcryptjs')
const usersModel = require('../models/users')

const main = async function () {

    const existing = await usersModel.getUserByUsername('mustapha@gmail.com')
    if (existing) {
        console.log('admin exists . skipping ...')
        return;
    }

    const hashedPassword = await bcrypt.hash('blogAdmin', 10);

    const admin = await usersModel.createUser({
        username: 'mustapha@gmail.com',
        password: hashedPassword,
        role: 'Admin'
    })

    if (admin) {
        console.log('Admin created')
    } else {
        console.log('failed to create admin')
    }

}

main()
    .catch((err) => console.log(err))
    .finally(() => prisma.$disconnect())



