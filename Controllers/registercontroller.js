const usersDb = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({ message: "user and password are required" });

  const duplicate = usersDb.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPassword = await bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashedPassword };
    usersDb.setUsers([...usersDb.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDb.users)
    );
    res
      .status(201)
      .json({ success: `new user ${newUser.username} is created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
