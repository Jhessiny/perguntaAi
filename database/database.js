const Sequelize = require("sequelize");
const connection = new Sequelize("perguntaai", "eliasdev", "fernandes91",{
    host: "mysql742.umbler.com",
    dialect: "mysql"
});

module.exports = connection;