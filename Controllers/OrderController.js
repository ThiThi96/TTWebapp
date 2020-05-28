let models = require('../ViewModels/ViewModels');
let orderBusiness = require('../BLL').OrderBusiness;
let productBusiness = require('../BLL').ProductBusiness;

let orderController = {
	GetOrdersByUserId: function(req, res){
		if (req.user && req.user.id == req.params['userId'])
		{
			let userId = req.params['userId'];
			let getCategories = productBusiness.GetCategories();
			let getUserOrders = orderBusiness.GetOrdersByUserId(userId);
			Promise.all([getCategories, getUserOrders]).then(values => {
				res.render('customer-order', {
					categories: values[0],
					orders: values[1],
					statusEnums: models.Order.statusEnums
				});		
			});			
		}
		else
		{
			productBusiness.GetCategories()
						   .then(categories => {
						   	 res.render('404', {
						   	 	categories: categories,
						   	 	user: req.user
						   	 });
						   });
		}
	},
	GetOrderById: function(req, res){
		let orderId = req.params['orderId'];
		res.render('customer-order-detail', 
			models.Order.orders[0]
		);		
	},
	AddOrder: function(req, res){
		res.render('customer-order-detail');
	},
	AddProductToBasket: function(req, res){

	},
	GetBasketByUserId: function(req, res){
		res.render('basket', {
			order: models.Order.orders[0],
			recommendedProducts: models.Product.slice(0, 3)
		});		
	},
	RemoveProductFromOrder: function(req, res){
		res.send('success');
	}
};

module.exports = orderController;