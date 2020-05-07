module.exports = (sequelize, Sequelize) => {
  let attributes = {
    ProductId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "ProductId"
    },
    ProductName: {
      type: Sequelize.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ProductName"
    },
    Price: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Price"
    },
    Image: {
      type: Sequelize.STRING(100),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Image"
    },
    Description: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Description"
    },
    Number: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Number"
    },
    BrandId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "BrandId",
      references: {
        key: "BrandId",
        model: "brand"
      }
    },
    CategoryId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CategoryId",
      references: {
        key: "CategoryId",
        model: "category"
      }
    }
  };
  let options = {
    tableName: "product",
    comment: "",
    freezeTableName: true,
    timestamps: false,
    indexes: [{
      name: "FK_Product_Brand_BrandId_idx",
      unique: false,
      type: "BTREE",
      fields: ["BrandId"]
    },
    {
      name: "FK_Product_Category_CategoryId_idx",
      unique: false,
      type: "BTREE",
      fields: ["CategoryId"]
    }]
  };
  let productModel = sequelize.define("product", attributes, options);
  // productModel.associate = function(models) {
  //   productModel.belongsTo(models.Categories, { as: 'category' });
  //   productModel.belongsTo(models.Brands, { as: 'brand' });
  // };
  return productModel;
};