const User = require('../auth/user-modal.js');

module.exports = async (req, res, next) => {
    const body = req.body
    try {
      const rows = await User.findUserBy({ username: body.username })
      if (rows.length) {
        req.userData = rows[0]
        next()
      } else {
        res.status(401).json("invalid credentials")
      }
    } catch (err) {
      res.status(500).json("invalid credentials")
    }
  }