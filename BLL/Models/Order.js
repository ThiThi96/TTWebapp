class Order {
	constructor(order) {
 		this._id = order.OrderId;
 		this._date = order.CreatedDate;
 		this._subTotal = order.SubTotal ? order.SubTotal : 0;
 		this._statusId = order.StatusId;
 		this._orderDetails = order.orderDetails ? order.orderDetails : [];	
 		this._tax = order.Tax ? order.Tax : 0;
 		this._shippingCost = order.ShippingCost ? order.ShippingCost : 0;
 		this._userId = order.UserId;
	}

	get id(){ return this._id }
	set id(value){ this._id = value }

	get date(){ return this._date }
	set date(value){ this._date = value }

	get subTotal(){ return this._subTotal }
	set subTotal(value){ this._subTotal = value }

	get statusId(){ return this._statusId }
	set statusId(value){ this._statusId = value }

	get total(){ 
		return order.SubTotal + order.Tax + order.ShippingCost;
	}
	set total(value){ this._total = value }	

	get userId(){ return this._userId }
	set userId(value){ this._userId = value }
}

module.exports = Order;