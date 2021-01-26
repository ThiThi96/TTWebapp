module.exports = (sequelize, Sequelize) => {
  const attributes = {
    CategoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: 'CategoryId',
    },
    CategoryName: {
      type: Sequelize.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'CategoryName',
    },
    ParentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'ParentId',
    },
  };
  const options = {
    tableName: 'category',
    comment: '',
    indexes: [],
    freezeTableName: true,
    timestamps: false,
  };
  const categoryModel = sequelize.define('category', attributes, options);
  categoryModel.associate = (models) => {
    categoryModel.hasMany(models.Products, { foreignKey: 'CategoryId', as: 'products' });
  };
  return categoryModel;
};
