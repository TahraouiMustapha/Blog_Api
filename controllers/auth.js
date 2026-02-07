
const passport = require('../passportJs/passportConfig')
const jwt = require('jsonwebtoken')
const CustomError = require('../errors/CustomError')
const CustomResponse = require('../utils/customResponse')
const { saveRefreshToken } = require('../models/auth')

const authenticate = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            try {
                if (err) {
                    return next(err || new Error("An error occured"))
                }

                if (!user) {
                    return res.status(400).json({ error: info.message })
                }

                req.login(user,
                    { session: false },
                    async (err) => {
                        if (err) {
                            return next(err)
                        }
                        // user is now attached to req.user

                        const body = {
                            id: user.userId,
                            username: user.username,
                            role: user.role
                        }
                        // const token = jwt.sign({ user: body }, process.env.SECRET_KEY)
                        const accessToken = jwt.sign({ user: body }, process.env.SECRET_KEY, { expiresIn: 15 * 60 * 1000 })
                        const refreshToken = jwt.sign({ user: body }, process.env.SECRET_KEY, { expiresIn: 7 * 24 * 60 * 60 * 1000 })

                        // store refresh token in DB 
                        await saveRefreshToken({ token: refreshToken })
                        // set refresh token as httpOnly cookie
                        res.cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict',
                            maxAge: 7 * 24 * 60 * 60 * 1000
                        });


                        const response = new CustomResponse(true, 'User is authenticated', { accessToken })
                        return res.status(200).json(response)
                    }
                )
            } catch (error) {
                return next(error)
            }
        }
    )(req, res, next);
}

const verifyAuth = (req, res, next) => {
    passport.authenticate(
        'jwt',
        { session: false }
    )(req, res, next)
}

const isAdmin = (req, res, next) => {
    const { role } = req.user
    if (role != 'Admin') return next(new CustomError(403, "Forbidden"))

    next()
}


module.exports = {
    authenticate,
    verifyAuth,
    isAdmin
}