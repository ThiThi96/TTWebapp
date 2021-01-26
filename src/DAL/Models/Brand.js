module.exports = (sequelize, Sequelize) => {
  const attributes = {
    BrandId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: 'BrandId',
    },
    BrandName: {
      type: Sequelize.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'BrandName',
    },
  };
  const options = {
    tableName: 'brand',
    comment: '',
    indexes: [],
    freezeTableName: true,
    timestamps: false,
  };
  const brandModel = sequelize.define('brand', attributes, options);
  brandModel.associate = (models) => {
    brandModel.hasMany(models.Products, { foreignKey: 'BrandId', as: 'products' });
  };
  return brandModel;
};
