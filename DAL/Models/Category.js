module.exports = (sequelize, Sequelize) => {
  let attributes = {
    CategoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "CategoryId"
    },
    CategoryName: {
      type: Sequelize.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CategoryName"
    },
    ParentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ParentId"
    }
  };
  let options = {
    tableName: "category",
    comment: "",
    indexes: [],
    freezeTableName: true,
    timestamps: false
  };
  let CategoryModel = sequelize.define("category", attributes, options);
  return CategoryModel;
};