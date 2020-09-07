let controllers = require('../Controllers/Controllers');

module.exports = function(app, passport){
	app.get('/', controllers.Home.Index);



	app.get('/product', controllers.Product.GetProducts);
	app.get('/product/:productId', controllers.Product.GetProductById);


	app.get('/user/:userId(\\d+)', controllers.User.GetUserDetails);

	app.route('/register')
	   .get(controllers.User.RegisterIndex)
	   .post(controllers.User.AddUser);
	// app.get('/register', controllers.User.RegisterIndex);
	// app.post('/register', controllers.User.AddUser);
	app.post('/user/logIn', controllers.User.LogIn);
	app.post('/user/logOut', controllers.User.LogOut);

	app.get('/user/:userId/order', controllers.Order.GetOrdersByUserId);
	//app.post('/user/:userId/order', passport.authenticate('jwt', {session: false}), controllers.Order.AddOrder);
	//app.get('/user/:userId/basket', controllers.Order.GetBasketByUserId);
	app.get('/order/:orderId', controllers.Order.GetOrderById);
	//app.post('/order/:orderId/remove/:productId', passport.authenticate('jwt', {session: false}), controllers.Order.RemoveProductFromOrder);

	app.get('/auth/facebook', passport.authenticate('facebook', { session: false }));

	app.get('/auth/facebook/callback', controllers.User.LogInByFacebook);

};