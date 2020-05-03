let User = function(sequelize, Sequelize) {
  let user = sequelize.define("user", {
    UserId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    FirstName: {
      type: Sequelize.STRING
    },
    LastName: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING
    },
    Password: {
      type: Sequelize.STRING
    },
    PhoneNumber: {
      type: Sequelize.STRING
    },    
    Address: {
      type: Sequelize.STRING
    },
    Birthdate: {
      type: Sequelize.DATE
    },
    IsFemale: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  });

  return user;
}

module.exports = User;