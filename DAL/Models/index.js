let dbConfig = require("../../Configuration/Db.config.js");

let Sequelize = require("sequelize");
let sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./User.js")(sequelize, Sequelize);

module.exports = db;