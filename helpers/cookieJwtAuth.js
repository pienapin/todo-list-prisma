require('dotenv').config();
const jwt = require('jsonwebtoken');

const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(403).send("User is not logged in!")
    return error;
  }
}

module.exports = cookieJwtAuth;