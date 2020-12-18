const User = require('../auth/user-modal.js');

module.exports = async (req, res, next) => {
    const body = req.body;
    try {
      const rows = await User.findUserBy({ username: body.username })
      if (!rows.length) {
        next()
      } else {
        res.status(401).json({ message: "username taken" })
      }
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }