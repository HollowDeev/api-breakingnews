const userService = require("../services/user.service");

const bcrypt = require("bcrypt");

const create = async (req, res) => {
  const body = req.body;

  try {
    const user = await userService.createService(body);
    res.status(201).send({ user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    const user = await userService.findAllService();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userService.findByIdService(id);

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  let body = req.body;

  try {
    const teste = await userService.updateService(body, req.userId);

    res.send({ message: "User successfully updated!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  create, 
  findAll,
  findById,
  update,
};
