const jwt = require("jsonwebtoken")
const User = require('../model/user')
const statusResponse = require('../common/status')
const secret = process.env.SECRET_STRING

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username, password })
        if (user) {
            const token = jwt.sign({id: user._id, username: username}, secret)
            return res.json(statusResponse.OK({username, token}))
        } else {
            return res.json(statusResponse.ERROR('Username or Password incorrect!'))
        }
    } catch (error) {
        res.json(statusResponse.ERROR(error.message))
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('auth_token').json(statusResponse.OK("Logout successful !"))
    } catch (error) {
        res.json(statusResponse.ERROR(error.message))
    }
}


module.exports = {
    login,
    logout
}
