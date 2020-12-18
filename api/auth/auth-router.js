const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./user-modal.js');
const validBody = require('../middleware/valid-schema.js');
const newUser = require('../middleware/uniqueUser.js');
const validUser = require('../middleware/checkUser.js');
const makeToken = require('../middleware/token-maker.js');


router.post('/register', validBody, newUser, (req, res) => {
  const body = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 12;
    try {
      const hash = bcrypt.hashSync(body.password, rounds)
      const newUser = User.addUser({ username: body.username, password: hash })
      res.status(201).json(newUser)
    } catch (e) {
      res.status(500).json(e.message)
    }
});

router.post('/login', validBody, validUser, async  (req, res) => {
  const body = req.body
    const verifies = await bcrypt.compareSync(body.password, req.userData.password)
    if(verifies) {
      const token = makeToken(req.userData)
      res.status(200).json({ message: `welcome, ${req.userData.username}`, token})
    } else {
      res.status(400).json({ message: 'invalid credentials' })
    }
});

module.exports = router;
