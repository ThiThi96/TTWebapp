class Product {
	constructor(product)
	{
		this._id = product.ProductId;
 		this._name = product.ProductName;
 		this._price = product.Price;
 		this._description = product.Description;
 		this._brandName = product.brand != undefined ? product.brand.BrandName : "";
 		this._categoryName = product.category != undefined ? product.category.CategoryName : "";
 		this._image = product.Image;
 		this._categoryId = product.CategoryId;
 		// this._details = product.details;
	}

	get id(){ return this._id }
	set id(value){ this._id = value }

	get name(){ return this._name }
	set name(value){ this._name = value }

	get price(){ return this._price }
	set price(value){ this._price = value }

	get categoryId(){ return this._categoryId }
	set categoryId(value){ this._categoryId = value }

	get description(){ return this._description }
	set description(value){ this._description = value }

	get brand(){ return this._brandName }
	set brand(value){ this._brandName = value }

	get category(){ return this._categoryName }
	set category(value){ this._categoryName = value }

	get image(){ return this._image }
	set image(value){ this._image = value }

	// get details(){ return this._details }
	// set details(value){ this._details = value }
}

module.exports = Product;