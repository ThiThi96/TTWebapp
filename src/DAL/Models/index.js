const Sequelize = require('sequelize');
const dbConfig = require('../Db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('./User.js')(sequelize, Sequelize);
db.Orders = require('./Order.js')(sequelize, Sequelize);
db.OrderDetails = require('./OrderDetail.js')(sequelize, Sequelize);
db.Products = require('./Product.js')(sequelize, Sequelize);
db.ProductDetails = require('./ProductDetail.js')(sequelize, Sequelize);
db.Sizes = require('./Size.js')(sequelize, Sequelize);
db.Brands = require('./Brand.js')(sequelize, Sequelize);
db.Categories = require('./Category.js')(sequelize, Sequelize);

db.Products.associate(db);
db.Brands.associate(db);
db.Categories.associate(db);
db.ProductDetails.associate(db);
db.Sizes.associate(db);

module.exports = db;
