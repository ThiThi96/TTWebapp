module.exports = (sequelize, Sequelize) => {
  let attributes = {
    ColourId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "ColourId"
    },
    CorlourName: {
      type: Sequelize.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "CorlourName"
    }
  };
  let options = {
    tableName: "colour",
    comment: "",
    indexes: [],
    freezeTableName: true,
    timestamps: false
  };
  let ColourModel = sequelize.define("colour", attributes, options);
  return ColourModel;
};