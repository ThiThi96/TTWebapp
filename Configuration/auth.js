module.exports = function(passport){
	let auth = function(req, res, next){
		passport.authenticate('jwt', {session: false}, function(err, user, info){
			if (user)
			{
				req.user = {
					name: `${user.FirstName} ${user.LastName}`,
					email: user.Email,
					id: user.UserId
				};
			}
			next();
		})(req, res, next);
	};
	return {
		AuthByJwt: auth
	};
};