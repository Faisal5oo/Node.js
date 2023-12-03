const usersDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const { user, pwd } = req.body;
  const cookies = req.cookies;

  if (!cookies || !cookies.jwt) {
    return res.sendStatus(409);
  }

  const refreshToken = cookies.jwt;
  const foundUser = usersDb.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );

    res.json({
      accessToken,
    });
  });
};

module.exports = { handleRefreshToken };
