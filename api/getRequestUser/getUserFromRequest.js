require('dotenv').config();

const jwt = require('jsonwebtoken');

  const getUserFromAuthHeader = (authHeader) => {
    // console.log('auth', authHeader)
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decode', decoded)
    return decoded;
  } catch (err) {
    return null;
  }
};


const getUserFromRequest = (req) => {
  // Check for user in request header
  const user = getUserFromAuthHeader(req.headers.authorization);
  // console.log('user', user)
  if (user) {
   return user;
  }

  // Return null if user is not found
  return null;
};

module.exports = getUserFromRequest;

