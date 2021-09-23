module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "passbd",
  database: "sequelize",
  define: {
    timestamp: true,
    underscored: true,
  }
};