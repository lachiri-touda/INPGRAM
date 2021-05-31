const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  
  if (!token) return res.status(402).send("Access Denied");
  try {
    // Verify token
    const verified = jwt.verify(token, process.env.Secret_Token);
    // Add user from payload
    req.user = verified;
    next();
  } catch (err) {
    return res.status(403).send("Invalid Token");
  }
};

exports.verifyToken = verifyToken;
