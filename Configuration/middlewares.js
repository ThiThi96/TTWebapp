let auth = require('./auth');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let exphbs  = require('express-handlebars');
let helpers = require('handlebars-helpers');
let math = helpers.math();
let customHelpers = require('./view-helpers');

let hbs = exphbs.create({
	extname: '.hbs',
	helpers: {
		...customHelpers,
		...math
	}
});


module.exports = function(app, express, passport){
	app.engine('hbs', hbs.engine);
	app.set('view engine', 'hbs');

	app.use(express.static('public'));
	app.use('/components', express.static('node_modules'));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(auth(passport).AuthByJwt);

};