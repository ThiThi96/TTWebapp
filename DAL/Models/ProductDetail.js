module.exports = (sequelize, Sequelize) => {
  let attributes = {
    ProductDetailId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "ProductDetailId"
    },
    ProductId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ProductId",
      references: {
        key: "ProductId",
        model: "product_model"
      }
    },
    ColourId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ColourId",
      references: {
        key: "ColourId",
        model: "colour_model"
      }
    },
    SizeId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SizeId",
      references: {
        key: "SizeId",
        model: "size_model"
      }
    },
    Number: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Number"
    }
  };
  let options = {
    tableName: "productdetail",
    comment: "",
    freezeTableName: true,
    timestamps: false,
    indexes: [{
      name: "FK_ProductDetail_Product_ProductId_idx",
      unique: false,
      type: "BTREE",
      fields: ["ProductId"]
    }, {
      name: "FK_ProductDetail_Size_SizeId_idx",
      unique: false,
      type: "BTREE",
      fields: ["SizeId"]
    }, {
      name: "FK_ProductDetail_Colour_ColourId_idx",
      unique: false,
      type: "BTREE",
      fields: ["ColourId"]
    }]
  };
  let producDetailModel = sequelize.define("productdetail", attributes, options);
  producDetailModel.associate = function(models) {
    producDetailModel.belongsTo(models.Sizes, { foreignKey: 'SizeId'});
  };
  return producDetailModel;
};