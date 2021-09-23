const Address = require("../models/Address");
const User = require("../models/User");

module.exports = {
  async create(request, response) {
    const { 
      zipcode,
      street,
      number,
    } = request.body;

    const { user_id } = request.params;

    const userAlreadyExists = await User.findByPk(user_id);

    if(!userAlreadyExists) {
      return response.status(404).json({ err: "User Not Found!" });
    }

    const address = await Address.create({
      zipcode,
      street,
      number,
      user_id,
    });

    return response.status(201).json(address);
  },

  async index(request, response) {
    const { user_id } = request.params;

    const user = await User.findByPk(user_id, {
      include: {
        association: "addresses"
      }
    });

    return response.json(user.addresses);
  }
};