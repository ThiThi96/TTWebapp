let express = require('express');
let app = express();
let port = 3000;
let exphbs  = require('express-handlebars');
let products = require('./Models/Product');
let categories = require('./Models/Category');
let brands = require('./Models/Brand');
let colours = require('./Models/Colour');


app.engine('hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use('/components', express.static('node_modules'));

app.get('/', (req, res) => res.render('index'));



app.get('/product', (req, res) => {
	res.render('product.hbs', {
		products: products,
		categories: categories,
		brands: brands,
		colours: colours
	});
});
app.get('/product/:productId', (req, res) => { 
	res.render('product-detail.hbs', {
		categories: categories,
		brands: brands,
		colours: colours,
		product: products[0],
		recommendedProducts: products.slice(0, 3),
		viewedProducts: products.slice(0, 3)
	});
});
//app.get('/product/search/:keyword.:brand.:color', (req, res) => res.render('index'));

app.get('/user/:userId', (req, res) => res.render('customer'));
app.post('/user', (req, res) => res.render('index'));
app.post('/user/logIn', (req, res) => res.render('index'));
app.post('/user/logOut', (req, res) => res.render('index'));

app.get('/user/:userId/order', (req, res) => res.render('customer-order'));
app.post('/user/:userId/order', (req, res) => res.render('customer-order-detail'));
app.get('/order/:orderId', (req, res) => res.render('customer-order-detail'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));