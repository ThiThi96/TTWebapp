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
								Email: email
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
	}
};

module.exports = userBusiness;