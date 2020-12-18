const jwt = require('jsonwebtoken');
const { secret } = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ message: 'token required' })
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'token invalid' })
      } else {
        req.dToken = decoded
        next()
      }
    })
  }
};
