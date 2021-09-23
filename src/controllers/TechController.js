const Tech = require("../models/Tech");
const User = require("../models/User");

module.exports = {
  async create(request, response) {
    const { user_id } = request.params;

    const { name } = request.body;

    // Verificar se usuário existe
    const user = await User.findByPk(user_id);

    // Se não existir, retornar um error
    if(!user) {
      return response.status(404).json({ error: "User not found!" });
    }

    // Pesquisar se essa "Tech" existe, se não criar ela
    const [tech] = await Tech.findOrCreate({
      where: {
        name
      }
    });

    // Adicionar uma tecnologia ao "usuário"
    await user.addTech(tech);

    return response.status(201).json(tech);
  },

  async index(request, response) {
    const { user_id } = request.params;

    const user = await User.findByPk(user_id, {
      include: {
        association: "techs",      // Trazer o relacionamento dele com os "techs"
        attributes: ["id","name"], // Dos "techs" traga apenas o "id" e o "name"
        through: {                 // Da tabela "pivô" traga apenas o "id" do usuário
          attributes: ["user_id"]
        }
      }
    });

    return response.json(user.techs);
  },

  async delete(request, response) {
    const { user_id } = request.params;

    const { name } = request.body;
  
    const user = await User.findByPk(user_id);

    if(!user) {
      return response.status(404).json({ error: "User not found!" });
    }  

    // Procurar pela tecnologia
    const tech = await Tech.findOne({
      where: {
        name
      }
    });

    await user.removeTech(tech);

    return response.json({ message: "Deleted!"});
  }
};
