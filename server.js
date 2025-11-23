const express = require('express')
require('dotenv').config()


const server = express()

// import routes
const postsRouter = require('./routes/posts')

const { newUser } = require('./models/posts.js')

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