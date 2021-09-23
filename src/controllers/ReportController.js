const {Op} = require("sequelize");
const User = require("../models/User");

module.exports = {
  async show(request, response) {
    // Encontrar todos os usuário que tenha o email terminando com @orkut.com
    // Desses usuários, buscar todos que moram na rua "Rua Quatro"
    // Desses usuário, buscar as tecnologias que começam com "React"

    const users = await User.findAll({
      attributes: ["name", "email"],
      where: {
        email: {
          // Usando "[]" porquer ele é uma variável e estou querendo usar ele como uma propriedade
          [Op.iLike]: "%@orkut.com"
        }
      },
      include: [
        {
          association: "addresses",
          where: {
            street: "Rua Quatro"
          }
        },
        {
          association: "techs",
          where: {
            name: {
              [Op.iLike]: "React%"
            }
          }
        }
      ]
    });

    return response.json(users);
  }
};