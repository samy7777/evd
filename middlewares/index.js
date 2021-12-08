const jwt = require("jsonwebtoken");

// exports.requireSignin = (req, res, next) => {
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(" ")[1];
//     const user = jwt.verify(token, process.env.JWT_KEY);
//     req.user = user;
//   } else {
//     return res.status(400).json({ message: "Authorization required" });
//   }
//   next();
//   //jwt.decode()
// };








module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'ERROR',
      code: 401,
      message: 'Authentication Failed!',
    });
  }
};



exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};