const express = require('express')
const { Prisma } = require('./generated/prisma/client')
require('dotenv').config()

const cors = require('cors')
const server = express()
const cookieParser = require('cookie-parser');

// configurations
server.use(express.urlencoded({ extended: true }));
server.use(express.json())
server.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: [
        'https://blog-musta.netlify.app',
        'https://blogtopadmin.netlify.app',
        'http://localhost:5173'
    ],
    optionsSuccessStatus: 200,
    credentials: true,
}
server.use(cors(corsOptions))



// import routes
const usersRouter = require('./routes/users.js')
const postsRouter = require('./routes/posts.js')
const authRouter = require('./routes/auth.js')
const adminRouter = require('./routes/admin.js')
const CustomResponse = require('./utils/customResponse.js')

// Sign up
server.use('/api/users', usersRouter)
server.use('/api/posts', postsRouter)
// Auth
server.use('/api/auth', authRouter)
// Admin
server.use('/api/admin', adminRouter)


// handle not found pages
server.use((req, res) => {
    return res.status(404).json({
        message: "Page not found"
    })
})

// middlware error handling
server.use((err, req, res, next) => {

    // handle prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code == 'P2025') {
            const errResponse = new CustomResponse(
                false,
                "Required record(s) not found",
                { error: "One or more required records do not exist" }
            );
            return res.status(409).json(errResponse)
        }

        if (err.code) {
            const errResponse = new CustomResponse(false, "Unique constraint error", { error: "Email already exist!" })
            return res.status(409).json(errResponse)
        }
    }

    console.error(err)

    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal Server Error'
    })
})

server.listen(process.env.PORT || 3000, () => {
    console.log('server has started')
})