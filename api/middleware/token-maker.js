const jwt = require('jsonwebtoken');
const secret = require('../config/secrets.js')

module.exports = (user) => {

    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '15m',
    }
    return jwt.sign(payload, secret, options)
}