require('dotenv').config();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  const userForToken = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    roleId: user.roleId
  };

  const token = jwt.sign(userForToken, config.development.SECRET_TOKEN, {
    expiresIn: '5h'
  });
  return token;
};

const verifyToken = (token) => {
  const decodedToken = jwt.verify(token, config.development.SECRET_TOKEN);
  if (!decodedToken) {
    const error = new Error('Invalid token');
    error.status = 401;
    throw error;
  }
  return decodedToken;
};

const comparePasswords = async (password, userPassword) => {
  const match = await bcrypt.compare(password, userPassword);
  return match;
};

module.exports = {
  comparePasswords
};

module.exports = { generateToken, verifyToken, comparePasswords };
