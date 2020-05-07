module.exports = (sequelize, Sequelize) => {
  let attributes = {
    OrderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "OrderId"
    },
    CreatedDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CreatedDate"
    },
    UpdatedDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "UpdatedDate"
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "UserId"
    },
    StatusId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "StatusId"
    },
    SubTotal: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SubTotal"
    },
    Tax: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Tax"
    }
  };
  let options = {
    tableName: "order",
    comment: "",
    indexes: [],
    freezeTableName: true,
    timestamps: false
  };
  let OrderModel = sequelize.define("order", attributes, options);
  return OrderModel;
};