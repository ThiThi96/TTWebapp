let express = require('express');
let app = express();
let port = 3000;
let exphbs  = require('express-handlebars');
let controllers = require('./Controllers/Controllers');
let db = require("./DAL/Models");
let cookieParser = require('cookie-parser');


let hbs = exphbs.create({
	extname: '.hbs',
	helpers: {
		compare: compareHelper
	}
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use('/components', express.static('node_modules'));
app.use(cookieParser());

app.get('/', (req, res) => res.render('index'));



app.get('/product', (req, res) => controllers.Product.GetProducts(req, res));
app.get('/product/:productId', (req, res) => controllers.Product.GetProductById(req, res));
//app.get('/product/search/:keyword.:brand.:color', (req, res) => res.render('index'));

app.get('/user/:userId', (req, res) => res.render('customer'));
app.post('/user', (req, res) => res.render('index'));
app.post('/user/logIn', (req, res) => res.render('index'));
app.post('/user/logOut', (req, res) => res.render('index'));

app.get('/user/:userId/order', (req, res) => controllers.Order.GetOrderByUserId(req, res));
app.post('/user/:userId/order', (req, res) => controllers.Order.AddOrder(req, res));
app.get('/user/:userId/basket', (req, res) => controllers.Order.GetBasketByUserId(req, res));
app.get('/order/:orderId', (req, res) => controllers.Order.GetOrderById(req, res));
app.post('/order/:orderId/remove/:productId', (req, res) => controllers.Order.RemoveProductFromOrder(req, res));


function compareHelper(lvalue, rvalue, options) {

		if (arguments.length < 3)
			throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

		operator = options.hash.operator || "==";
		
		var operators = {
			'==':		function(l,r) { return l == r; },
			'===':	function(l,r) { return l === r; },
			'!=':		function(l,r) { return l != r; },
			'<':		function(l,r) { return l < r; },
			'>':		function(l,r) { return l > r; },
			'<=':		function(l,r) { return l <= r; },
			'>=':		function(l,r) { return l >= r; },
			'typeof':	function(l,r) { return typeof l == r; }
		}

		if (!operators[operator])
			throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

		var result = operators[operator](lvalue,rvalue);

		if( result ) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
		
	};
app.listen(port, () => console.log(`Example app listening on port ${port}!`));