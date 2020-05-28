let bcrypt = require('bcrypt');
let userBusiness = require('../BLL').UserBusiness;
let productBusiness = require('../BLL').ProductBusiness;
let jwt = require('jsonwebtoken');
let passport = require('passport');

let userController = {
	RegisterIndex: function(req, res){
		productBusiness.GetCategories()
					   .then(categories => {
					   		if (!req.user)
					   		{
						   		res.render('register', {
									categories: categories
								});					   			
					   		}
					   		else
					   		{
					   			res.render('index', {
									user: req.user,
									categories: categories
								});
					   		}
					   });
	},
	AddUser: function(req, res){
		let user = {
			Email: req.body.email,
			Password: req.body.password,
			FirstName: req.body.firstName,
			LastName: req.body.lastName,
			Birthdate: req.body.birthdate ? req.body.birthdate : null,
			Address: req.body.address
		};
		let saltRounds = 10;
		let getCategories = productBusiness.GetCategories();
		let hashPassAndCreateUser = bcrypt.hash(req.body.password, saltRounds)
									.then(hash => {
										user.Password = hash;
										return userBusiness.AddUser(user);
									});
		Promise.all([getCategories, hashPassAndCreateUser])
			.then(values => {
				res.render('register', {
					categories: values[0],
					userId: values[1].UserId
				});
			}).catch(err => {
				res.render('register', {
					error: true
				});
			});

	},
	LogIn: function(req, res){
		passport.authenticate('local', {session: false}, (err, user, info) => {
	        if (err || !user) {
	            return res.status(400).json({
	                message: 'Something is not right',
	                user   : user
	            });
	        }
	        let jwtPayload = {
	        	id: user.UserId
	        };
	        let expireTime = 10*24*60*60*1000;
	        let token = jwt.sign(jwtPayload, 'your_jwt_secret'
	        // 	, 
	        // { 
	        // 	expiresIn: expireTime/1000
	        // }
	        );

	        res.cookie('jwt', token, {
	        	httpOnly: true,
	        	sameSite: true,
	        	maxAge: expireTime
	        });
	  		res.redirect('back');
	    })(req, res);
	},
	LogOut: function(req, res){
		console.log(req.cookies['jwt']);
		if (req.cookies['jwt'])
		{
			res.clearCookie('jwt');
		}
		res.send('1');
	},
	GetUserDetails: function(req, res){
		if (req.user && req.user.id == req.params.userId)
		{
			let getUserDetails = userBusiness.GetUserById(req.user.id);
			let getCategories = productBusiness.GetCategories();
			Promise.all([getUserDetails, getCategories])
					.then(function(values) {
						let user = values[0];
						user.name = `${user.FirstName} ${user.LastName}`;
						res.render('customer', {
							user: user,
							categories: values[1]
						});	
					});
	
		}
		else
		{
			res.render('404', {
				user: req.user
			});
		}
	}
};

module.exports = userController;