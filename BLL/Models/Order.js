class Order {
	constructor(order) {
 		this._id = order.OrderId;
 		this._date = order.CreatedDate;
 		this._subTotal = order.SubTotal ? order.SubTotal : 0;
 		this._statusId = order.StatusId;
 		this._products = order.orderDetails ? order.orderDetails : [];	
 		this._tax = order.Tax ? order.Tax : 0;
 		this._shippingCost = order.ShippingCost ? order.ShippingCost : 0;
 		this._userId = order.UserId;
 		this._statusEnums = order.statuses;
		this._statusDescription = order.statusDescription;
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
		return this._subTotal + this._tax + this._shippingCost;
	}
	set total(value){ this._total = value }	

	get products(){ return this._products }
	set products(value){ this._products = value }

	get tax(){ return this._tax }
	set tax(value){ this._tax = value }

	get shippingCost(){ return this._shippingCost }
	set shippingCost(value){ this._shippingCost = value }	

	get userId(){ return this._userId }
	set userId(value){ this._userId = value }

	get statusEnums(){ return this._statusEnums }
	set statusEnums(value){ this._statusEnums = value }

	get statusDescription(){ return this._statusDescription }
	set statusDescription(value){ this._statusDescriptione = value }	
}

module.exports = Order;