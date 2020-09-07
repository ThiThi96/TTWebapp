module.exports =  (sequelize, Sequelize) => {
  let attributes = {
    SizeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "SizeId"
    },
    SizeName: {
      type: Sequelize.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "SizeName"
    }
  };
  let options = {
    tableName: "size",
    comment: "",
    indexes: [],
    freezeTableName: true,
    timestamps: false
  };
  let sizeModel = sequelize.define("size", attributes, options);
  sizeModel.associate = function(models) {
    sizeModel.hasMany(models.ProductDetails, { foreignKey: 'SizeId', as: 'ProductDetails' });
  };
  return sizeModel;
};