
const passport = require('../passportJs/passportConfig')
const jwt = require('jsonwebtoken')


const authenticate = (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
            try {
                if (err || !user) {
                    return next(err || new Error("An error occured"))
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
                        console.log(body)
                        const token = jwt.sign({ user: body }, process.env.SECRET_KEY)
                        return res.json({ token })
                    }
                )
            } catch (error) {

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


module.exports = {
    authenticate,
    verifyAuth
}