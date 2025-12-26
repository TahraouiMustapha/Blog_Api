const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const bcrypt = require('bcryptjs')

const userModel = require('../models/users')

passport.use(new localStrategy(
    { session: false }
    , async function (username, password, done) {
        try {
            const user = await userModel.getUserByUsername(username);
            if (!user) {
                return done(null, false, { message: "User not found" })
            }

            const hashedPassword = user.password;
            const matched = await bcrypt.compare(password.toString(), hashedPassword)

            if (!matched) {
                return done(null, false, { message: "Wrong password" })
            }
            return done(null, user, { message: "Logged in Successfully" })
        } catch (err) {
            return done(err)
        }
    })
)

passport.use(new JwtStrategy(
    {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (jwt_payload, done) {
        try {
            const user = await userModel.getUserByUsername(jwt_payload.user.username)
            if (!user) {
                return done(null, false, { message: "User not found Re-login again! " })
            }

            done(null, jwt_payload.user)
        } catch (err) {
            done(err)
        }
    }
))

module.exports = passport