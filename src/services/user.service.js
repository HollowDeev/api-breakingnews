const userRepositories = require("../repositories/user.repositories");
const { generateToken } = require("../services/auth.service");
const bcrypt = require("bcrypt");

const createService = async (body) => {
  const { name, username, email, password, avatar, background } = body;

  if (!name || !username || !email || !password || !avatar || !background)
    throw new Error("Submit all fields for registration");

  const foundUser = await userRepositories.findByEmailRepositories(email);
  if (foundUser) throw new Error("E-mail already registered");

  encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    username,
    email,
    password: encryptedPassword,
    avatar,
    background,
  };

  const user = await userRepositories.createRepositories(newUser);

  if (!user) throw new Error("Error creating User");

  const token = generateToken(user._id);

  return {
    message: "User created successfully",
    token: token,
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background,
    },
  };
};

const findAllService = async () => {
  const users = await userRepositories.findAllRepositories();

  if (users.length === 0) throw new Error("There are no registered users");

  return users;
};

const findByIdService = async (userId) => {
  if (!userId) throw new Error("Send user Id to be find");

  const user = await userRepositories.findByIdRepositories(userId);

  return user;
};

const updateService = async (
  { name, username, email, password, avatar, background },
  userIdLogged
) => {
  if (!name && !username && !email && !password && !avatar && !background)
    throw new Error("Submit at least one fields for update");

  const user = await userRepositories.findByIdRepositories(userIdLogged);
  if (!user) throw new Error("User not found");

  if (password) encryptedPassword = await bcrypt.hash(password, 10);

  await userRepositories.updateRepositories(
    userIdLogged,
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  return;
};

module.exports = {
  createService,
  findAllService,
  findByIdService,
  updateService,
};
