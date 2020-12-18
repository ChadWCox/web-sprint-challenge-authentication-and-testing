
module.exports = (req, res, next) => {
    const body = req.body;

  if(!body.username || !body.password) {
    res.status(400).json({ message: "username and password required" })
  } else {
    next()
  }
};
     