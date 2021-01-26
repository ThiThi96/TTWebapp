module.exports = (sequelize, Sequelize) => {
  const attributes = {
    SizeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: 'SizeId',
    },
    SizeName: {
      type: Sequelize.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'SizeName',
    },
  };
  const options = {
    tableName: 'size',
    comment: '',
    indexes: [],
    freezeTableName: true,
    timestamps: false,
  };
  const sizeModel = sequelize.define('size', attributes, options);
  sizeModel.associate = (models) => {
    sizeModel.hasMany(models.ProductDetails, { foreignKey: 'SizeId', as: 'ProductDetails' });
  };
  return sizeModel;
};
