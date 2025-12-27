
const passport = require('../passportJs/passportConfig')
const jwt = require('jsonwebtoken')
const CustomError = require('../errors/CustomError')

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
                    (err) => {
                        if (err) {
                            return next(err)
                        }
                        // user is now attached to req.user

                        const body = {
                            id: user.userId,
                            username: user.username,
                            role: user.role
                        }
                        const token = jwt.sign({ user: body }, process.env.SECRET_KEY)
                        return res.json({ token })
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