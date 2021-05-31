const User = require("../model/user")
const jwt = require("jsonwebtoken")
const statusResponse = require("../common/status")
const secret = process.env.SECRET_STRING

module.exports = function (req, res, next) {
    try {
        const token = req.cookies?.auth_token
        if (!token) return res.json(statusResponse.ERROR('NULL TOKEN !!!'))
        const verified = jwt.verify(token, secret)
        req.verified = verified
        next()
    } catch (error) {
        res.json(statusResponse.ERROR(error.message))
    }
}