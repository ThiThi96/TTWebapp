let db = require('../DAL/Models');

let orderBusiness = {
	GetOrdersByUserId: function(userId, offset, numberOfItems, orderBy, isDesc) {
		return db.Orders
				 .findAll({
				 	where: {
				 		UserId: userId
				 	},
				 	limit: numberOfItems,
					offset: offset,
					order: [[orderBy ? orderBy : 'OrderId', isDesc ? 'DESC' : 'ASC']]
				 }).then(data => {
			 		let orders = data.map(x => {
				 		let order = x.get();
				 		return {
					 		id: order.OrderId,
					 		date: order.CreatedDate,
					 		total: order.SubTotal,
					 		statusId: order.StatusId
				 		};

				 	});
				 	return orders;
				 });
	},
	GetOrderDetailsById: function(orderId) {
		let query = `SELECT *
					 FROM Order O
					 	INNER JOIN OrderDetail OD ON O.OrderId = OD.OrderId
					 	INNER JOIN ProductDetail PD ON OD.ProductDetailId = PD.ProductDetailId
					 	INNER JOIN Product P ON PD.ProductId = P.ProductId
					 WHERE O.OrderId = $orderId`;
		return db.Sequelize.query(query, {
					bind: { orderId: orderId },
		    		type: db.Squelize.SELECT
				}).then(data => {
					let result = {
						id: data[0].OrderId,
						date: data[0].date,
						subTotal: data[0].SubTotal,
						shippingCost: data[0].ShippingCost,
						tax: data[0].Tax,
						total: subTotal + tax,
						products: []
					};
					for (let i =0; i< data.length; i++)
					{
						result.products.push({
							id: data[i].ProductId,
							price: data[i].Price,
							discount: data[i].Discount,
							total: data[i].DetailTotal,
							image: data[i].Image,
							name: data[i].ProductName
						});
					}
					return result;
				});		
	}
};

module.exports = orderBusiness;