const User = require("../models/User");
const { hash } = require("bcryptjs");

module.exports = {
  async create(request, response) {
    const {
      name,
      email,
      password,
    } = request.body;

    const passwordHash = await hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    return response.status(201).json(user);
  },
  async index(request, response) {
    const users = await User.findAll();

    return response.json(users);
  }
};