const usersDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res
      .status(409)
      .json({ message: "Username and password are required" });
  }

  const foundUserIndex = usersDb.users.findIndex(
    (person) => person.username === user
  );

  if (foundUserIndex === -1) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const foundUser = usersDb.users[foundUserIndex];

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Update user's refreshToken in the usersDb
    foundUser.refreshToken = refreshToken;

    // Update the usersDb with the modified user data
    usersDb.users[foundUserIndex] = foundUser;

    // Save the updated users data to the file
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDb.users, null, 2) // Adding null and 2 for formatting
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json(accessToken);
  } else {
    return res.sendStatus(401);
  }
};

module.exports = { handleLogin };
