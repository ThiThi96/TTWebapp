let db = require('../DAL/Models');

let userBusiness = {
	AddUser: function(user){
		return	db.Users.create(user)
					.then(data => {
						return data.get();
					});
	},
	GetUser: function(email, password){
		return db.Users.findOne({
							where: {
								Email: email,
								FacebookId: null
							}
						}).then(data => {
							return data ? data.get() : undefined;
						});
	},
	GetUserById: function(userId) {
		return db.Users.findByPk(userId)
					   .then(data => {
					   	 return data ? data.get() : undefined;
					   });
	},
	GetOrAddUserByFacebookProfile: function(profile) {
		return db.Users.findOrCreate({
					where: {
						FacebookId: profile.id
					},
					defaults: {
						FirstName: profile.name['givenName'],
						LastName: profile.name['familyName']
					}
				}).then(data => {
					return data ? data[0].get() : undefined;
				});
	}
};

module.exports = userBusiness;