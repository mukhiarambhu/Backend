const jwt = require("jsonwebtoken");
require("dotenv").config();
function verifyToken(token) {
  return new Promise(function (resolve) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, user) {
      if (err) return reject(err);
      return resolve(user);
    });
  });
}

async function authenticate(req, res, next) {
  try {
    //step1-check if we have received token  ,if not throw error
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith("Bearer")) {
      return res.status(500).send({ message: "please provide bearer token" });
    }

    const token = bearerToken.split(" ")[1];
    //step2-if yes extract user from token ,if user not found throw error
    //else attach user to req,return next
    const { user } = await verifyToken(token);

    req.user = user;
    return next();
  } catch (err) {
    return res
      .status(500)
      .send({ message: "please provide valid bearer token" });
  }
}
module.exports = authenticate;
