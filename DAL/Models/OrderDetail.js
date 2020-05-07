module.exports = (sequelize, Sequelize) => {
  let attributes = {
    OrderDetailId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "OrderDetailId"
    },
    ProductDetailId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ProductDetailId"
    },
    Quantity: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Quantity"
    },
    Discount: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Discount"
    },
    OrderId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "OrderId"
    }
  };
  let options = {
    tableName: "orderdetail",
    comment: "",
    indexes: [],
    freezeTableName: true,
    timestamps: false
  };
  let OrderdetailModel = sequelize.define("orderdetail", attributes, options);
  return OrderdetailModel;
};