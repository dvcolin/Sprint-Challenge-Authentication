const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/usersModel.js');
const jwt = require('jsonwebtoken')
const secrets = require('../secrets/secrets.js');

router.post('/register', validateUser, (req, res) => {
  // implement registration
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.insert(user)
  .then(user => {
    const token = createToken(user)
    res.status(201).json({ token });
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ error: 'Server error' });
  })
});

router.post('/login', (req, res) => {
  // implement login
});

function createToken(user) {
  const payload = {
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.JWT_SECRET, options);
}

function validateUser(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    next();
  } else {
    res.status(400).json({ message: 'Please enter a username and password.' })
  }
}


module.exports = router;
