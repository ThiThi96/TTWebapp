class OrderDetail{
	constructor(orderId, date, subTotal, shippingCost, tax, userId, products, statuses, statusDescription) {
		this._id = orderId;
		this._date = date;
		this._subTotal = subTotal;
		this._shippingCost = shippingCost;
		this._tax = tax;
		this._total = subTotal + tax + shippingCost;
		this._userId = userId;
		this._products = products;
		this._statusEnums = statuses;
		this._statusDescription = statusDescription
	}


	get id(){ return this._id }
	set id(value){ this._id = value }

	get date(){ return this._date }
	set date(value){ this._date = value }

	get subTotal(){ return this._subTotal }
	set subTotal(value){ this._subTotal = value }

	get shippingCost(){ return this._shippingCost }
	set shippingCost(value){ this._shippingCost = value }

	get tax(){ return this._tax }
	set tax(value){ this._tax = value }

	get total(){ return this._total }
	set total(value){ this._total = value }

	get userId(){ return this._userId }
	set userId(value){ this._userId = value }

	get products(){ return this._products }
	set products(value){ this._products = value }

	get statusEnums(){ return this._statusEnums }
	set statusEnums(value){ this._statusEnums = value }

	get statusDescription(){ return this._statusDescription }
	set statusDescription(value){ this._statusDescriptione = value }	
}