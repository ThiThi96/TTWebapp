module.exports = {
  HOST: "db",
  USER: "root",
  PASSWORD: "31101996",
  DB: "shop",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};