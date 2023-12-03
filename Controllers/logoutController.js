const usersDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies || !cookies.jwt) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.jwt;
  const foundUser = usersDb.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  // Delete refreshtoken in db
  const otherUsers = usersDb.users.filter((person) => {
    return person.refreshToken !== foundUser.refreshToken;
  });
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDb.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDb.users)
  );
  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
