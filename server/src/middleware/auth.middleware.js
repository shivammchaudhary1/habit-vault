// const { jwtVerify } = require("../config/jwt.js");
// const User = require("../models/user.model.js");

// async function isAuthenticated(req, res, next) {
//   try {
//     const token = req.headers.authorization?.split(" ")[1] || req.query.token;

//     const { userId } = jwtVerify(token, "access");
//     const user = await User.findById(userId);
//     req.user = user;
//     return next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Session Expired, Please Login again",
//       error: error.message,
//     });
//   }
// }

// export { isAuthenticated };


const { jwtVerify } = require("../config/jwt.js");
const User = require("../models/user.model.js");

async function isAuthenticated(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.query.token;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const decoded = jwtVerify(token);
    const user = await User.findById(decoded.id); // `id` is used in signJwt

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Session expired, please login again",
      error: error.message,
    });
  }
}

module.exports = { isAuthenticated };
