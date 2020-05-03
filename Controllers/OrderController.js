let models = require('../ViewModels/ViewModels');

let orderController = {
	GetOrdersByUserId: function(req, res){
		res.render('customer-order', {
			orders: models.Order.orders,
			statusEnums: models.Order.statusEnums
		});		
	},
	GetOrderById: function(req, res){
		res.render('customer-order-detail', 
			models.Order.orders[0]
		);		
	},
	AddOrder: function(req, res){
		res.render('customer-order-detail');
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