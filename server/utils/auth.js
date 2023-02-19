const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
// set token secret and expiration date
const secret = "ssshhhh";
//const secret = process.env.SECRET;
const expiration = "2h";
//const expiration = process.env.EXPIRATION;

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return res
        .status(400)
        .json({ message: "No token, authorization denied!" });
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
      return res.status(400).json({ message: "invalid token!" });
    }

    // send to next endpoint
    next();
  },
  signToken: function ({ name, username, email, isAdmin, _id }) {
    const payload = { name, username, email, isAdmin, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
