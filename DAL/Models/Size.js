module.exports =  (sequelize, Sequelize) => {
  let attributes = {
    SizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "SizeId"
    },
    SizeName: {
      type: DataTypes.STRING(45),
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
  let SizeModel = sequelize.define("size", attributes, options);
  return SizeModel;
};