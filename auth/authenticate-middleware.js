const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets.js');

module.exports = (req, res, next) => {
  if (token) {
    jwt.verify(token, secrets.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.user = { username: decodedToken.username };
        next();
      }
    })
  }

  res.status(401).json({ you: 'shall not pass!' });
};
