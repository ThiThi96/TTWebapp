module.exports = (sequelize, Sequelize) => {
  const attributes = {
    ColourId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: 'ColourId',
    },
    CorlourName: {
      type: Sequelize.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'CorlourName',
    },
  };
  const options = {
    tableName: 'colour',
    comment: '',
    indexes: [],
    freezeTableName: true,
    timestamps: false,
  };
  const ColourModel = sequelize.define('colour', attributes, options);
  return ColourModel;
};
