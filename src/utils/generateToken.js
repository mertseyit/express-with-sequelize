const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

module.exports = generateToken;
