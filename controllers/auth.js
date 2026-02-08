
const passport = require('../passportJs/passportConfig')
const jwt = require('jsonwebtoken')
const CustomError = require('../errors/CustomError')
const CustomResponse = require('../utils/customResponse')
const { saveRefreshToken, getRefreshToken } = require('../models/auth')

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
                            secure: process.env.NODE_ENV === 'production', // secure in production (https)
                            sameSite: 'lax', // for cross-origin (default for modern browser)
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

const logout = async (req, res, next) => {
    const { refreshToken } = req.cookies;


    const validToken = await getRefreshToken({ token: refreshToken })
    if (!validToken) {
        return next(new CustomError(403, 'Forbidden'))
    }

    // delete refresh token after successful check
    res.clearCookie('refreshToken');

    const response = new CustomResponse(true, 'Log out', {})
    return res.status(200).json(response)
}


module.exports = {
    authenticate,
    verifyAuth,
    isAdmin,
    logout
}