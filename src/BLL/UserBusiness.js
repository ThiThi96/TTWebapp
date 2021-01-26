const db = require('../DAL/Models');

const userBusiness = {
  AddUser(user) {
    return db.Users.create(user)
      .then((data) => data.get());
  },
  GetUser(email) {
    return db.Users.findOne({
      where: {
        Email: email,
        FacebookId: null,
      },
    }).then((data) => (data ? data.get() : undefined));
  },
  GetUserById(userId) {
    return db.Users.findByPk(userId)
      .then((data) => (data ? data.get() : undefined));
  },
  GetOrAddUserByFacebookProfile(profile) {
    return db.Users.findOrCreate({
      where: {
        FacebookId: profile.id,
      },
      defaults: {
        FirstName: profile.name.givenName,
        LastName: profile.name.familyName,
      },
    }).then((data) => (data ? data[0].get() : undefined));
  },
};

module.exports = userBusiness;
