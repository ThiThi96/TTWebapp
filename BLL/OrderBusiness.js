let db = require('../DAL/Models');
let models = require('./Models');
let Status = {
	OnHold: {
		Value: 1,
		Description: 'On hold'
	},
	BeingPrepared: {
		Value: 2,
		Description: 'Being prepared'
	},
	Cancelled: {
		Value: 3,
		Description: 'Cancelled'
	},
	Received: {
		Value: 4,
		Description: 'Received'
	}
};

function GetOrderStatusDescription(value){
	for (let i in Status)
	{
		if (Status[i].Value === value)
			return Status[i].Description;
	}
	return null;
}

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
				 		// return {
					 	// 	id: order.OrderId,
					 	// 	date: order.CreatedDate,
					 	// 	total: order.SubTotal,
					 	// 	statusId: order.StatusId
				 		// };
				 		return new models.Order(order);
				 	});
				 	return orders;
				 });
	},
	GetOrderDetailsById: function(orderId) {
		let query = `SELECT O.OrderId, O.CreatedDate as Date, O.SubTotal, O.ShippingCost, O.Tax, O.UserId, O.StatusId,
							P.Image, P.ProductId, P.Price, P.ProductName,
							P.Price * OD.Quantity as DetailTotal, OD.Discount, OD.Quantity
					 FROM shop.Order O
					 	INNER JOIN shop.OrderDetail OD ON O.OrderId = OD.OrderId
					 	INNER JOIN shop.ProductDetail PD ON OD.ProductDetailId = PD.ProductDetailId
					 	INNER JOIN shop.Product P ON PD.ProductId = P.ProductId
					 WHERE O.OrderId = ?`;
		return db.sequelize.query(query, {
					replacements: [orderId],
		    		type: db.Sequelize.SELECT
				}).then(data => {
					let orderDetails = data[0];
					let result = null;
					if (orderDetails.length > 0)
					{
						// result = {
						// 	id: orderDetails[0].OrderId,
						// 	date: orderDetails[0].Date,
						// 	subTotal: orderDetails[0].SubTotal,
						// 	shippingCost: orderDetails[0].ShippingCost,
						// 	tax: orderDetails[0].Tax,
						// 	total: orderDetails[0].SubTotal + orderDetails[0].Tax + orderDetails[0].ShippingCost,
						// 	userId: orderDetails[0].UserId,
						// 	products: [],
						// 	statusEnums: Status,
						// 	statusDescription: GetOrderStatusDescription(orderDetails[0].StatusId)
						// };
						orderDetails[0].statuses = Status;
						orderDetails[0].statusDescription = GetOrderStatusDescription(orderDetails[0].StatusId);
						result = new models.Order(orderDetails[0]);
						for (let i =0; i< orderDetails.length; i++)
						{
							// result.products.push({
							// 	id: orderDetails[i].ProductId,
							// 	price: orderDetails[i].Price,
							// 	discount: orderDetails[i].Discount,
							// 	total: orderDetails[i].DetailTotal - orderDetails[i].DetailTotal * (orderDetails[i].Discount/100),
							// 	image: orderDetails[i].Image,
							// 	name: orderDetails[i].ProductName,
							// 	quantity: orderDetails[i].Quantity
							// });

							result.products.push(new models.OrderDetail(orderDetails[i]));
						}
					}
					return result;
				});		
	}
};

module.exports = orderBusiness;