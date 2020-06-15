let express = require('express');
let app = express();
let port = 3000;
let exphbs  = require('express-handlebars');
let controllers = require('./Controllers/Controllers');
let db = require("./DAL/Models");
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');
let auth = require('./Configuration/auth');
let helpers = require('handlebars-helpers');
let math = helpers.math();

let customHelpers = {
		compare: compareHelper,
		loop: Times
};

let hbs = exphbs.create({
	extname: '.hbs',
	helpers: {
		...customHelpers,
		...math
	}
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use('/components', express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(auth(passport).AuthByJwt);

require('./Configuration/passport-config')(passport);

app.get('/', controllers.Home.Index);



app.get('/product', controllers.Product.GetProducts);
app.get('/product/:productId', controllers.Product.GetProductById);


app.get('/user/:userId(\\d+)', controllers.User.GetUserDetails);
app.get('/register', controllers.User.RegisterIndex);
app.post('/register', controllers.User.AddUser);
app.post('/user/logIn', controllers.User.LogIn);
app.post('/user/logOut', controllers.User.LogOut);

app.get('/user/:userId/order', controllers.Order.GetOrdersByUserId);
//app.post('/user/:userId/order', passport.authenticate('jwt', {session: false}), controllers.Order.AddOrder);
//app.get('/user/:userId/basket', controllers.Order.GetBasketByUserId);
app.get('/order/:orderId', controllers.Order.GetOrderById);
//app.post('/order/:orderId/remove/:productId', passport.authenticate('jwt', {session: false}), controllers.Order.RemoveProductFromOrder);

app.get('/auth/facebook',
  passport.authenticate('facebook', { session: false }));

app.get('/auth/facebook/callback', controllers.User.LogInByFacebook);


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

function Times(n, block) {
    var accum = '';
    for(var i = 0; i < n; i ++) {
        block.data.index = i;
        block.data.position = i + 1;
        block.data.first = i === 0;
        block.data.last = i === (n - 1);
        accum += block.fn(this);
    }
    return accum;
};
app.listen(port, () => console.log(`Example app listening on port ${port}!`));