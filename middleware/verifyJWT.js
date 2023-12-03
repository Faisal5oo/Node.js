const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res
      .status(401)
      .json({ error: "Unauthorized - Missing Authorization Header" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ error: "Unauthorized - Invalid Token Format" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      return res.status(403).json({ error: "Forbidden - Invalid Token" });
    }
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
