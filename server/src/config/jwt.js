var jwt = require("jsonwebtoken");
const config = require("./default");

// Sign JWT
function signJwt(payload, expiresIn = "1d") {
  return jwt.sign(payload, config.jwtKey, { expiresIn });
}
// Verify JWT
function jwtVerify(token) {
  try {
    return jwt.verify(token, config.jwtKey);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { signJwt, jwtVerify };
