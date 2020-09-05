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
  let categoryModel = sequelize.define("category", attributes, options);
  categoryModel.associate = function(models) {
    categoryModel.hasMany(models.Products, { foreignKey: 'CategoryId', as: 'products' });
  };
  return categoryModel;
};