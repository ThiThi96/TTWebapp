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
db.Orders = require("./Order.js")(sequelize, Sequelize);
db.OrderDetails = require("./OrderDetail.js")(sequelize, Sequelize);
db.Products = require("./Product.js")(sequelize, Sequelize);
db.Brands = require("./Brand.js")(sequelize, Sequelize);
db.Categories = require("./Category.js")(sequelize, Sequelize);

// db.Products.belongsTo(db.Brands, { foreignKey: 'BrandId', as: 'brand' });
// db.Products.belongsTo(db.Categories, { foreignKey: 'CategoryId', as: 'category' });
//db.Brands.hasMany(db.Products, { foreignKey: 'BrandId', as: 'products' });
//db.Categories.hasMany(db.Products, { foreignKey: 'CategoryId', as: 'products' });

db.Products.associate(db);
db.Brands.associate(db);
db.Categories.associate(db);

module.exports = db;