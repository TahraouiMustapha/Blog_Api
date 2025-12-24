const express = require('express')
require('dotenv').config()


const server = express()

// configurations
server.use(express.urlencoded({ extended: true }));
server.use(express.json())


// import routes
const usersRouter = require('./routes/users.js')
const postsRouter = require('./routes/posts')

// Sign up
server.use('/api/users', usersRouter)
server.use('/api/posts', postsRouter)



// handle not found pages
server.use((req, res) => {
    return res.status(404).json({
        message: "Page not found"
    })
})

// middlware error handling
server.use((err, req, res, next) => {
    console.error(err)

    res.status(err.statusCode || 500).json({
        error: err.message || 'Internal Server Error'
    })
})

server.listen(process.env.PORT || 3000, () => {
    console.log('server has started')
})