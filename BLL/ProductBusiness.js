let db = require('../DAL/Models');
let Sequelize = require("sequelize");

let productBusiness = {
	GetProductsByCategoryId: function(categoryId, offset, numberOfItems, orderBy, isDesc){
		return new Promise(function(resolve, reject) {
				db.Products
					.findAll({
						where: {
							CategoryId: categoryId
					 	},
					 	include: [
					 		{
					 			model: db.Brands,
					 			as: 'brand'
					 		},
					 		{
					 			model: db.Categories,
					 			as: 'category'
					 		}
					 	],
					 	limit: numberOfItems,
					 	offset: offset,
					 	order: [[orderBy ? orderBy : 'ProductName', isDesc ? 'DESC' : 'ASC']]
					 }).then(data => {
					 	let products = data.map(x => {
					 		let product = x.get();
					 		return {
						 		id: product.ProductId,
						 		name: product.ProductName,
						 		price: product.Price,
						 		description: product.Description,
						 		brand: product.brand != undefined ? product.brand.BrandName : "",
						 		category: product.category != undefined ? product.category.CategoryName : "",
						 		image: product.Image
					 		}

					 	});
					 	resolve(products);
					 });
			});
	},
	GetCategories: function(){
		return new Promise(function(resolve, reject){
				db.Categories
				   .findAll({
				   		attributes: [
				   			"CategoryId",
				   			"CategoryName",
				   			"ParentId",
				   			[Sequelize.fn('COUNT', Sequelize.col('ProductId')), 'NumberOfProducts'] 
				   		], 
				   		group: [ "CategoryId", "CategoryName"],
				   		include: {
				   			model: db.Products,
				   			as: 'products'
				   		}
				   })
				   .then(data => {

				   		let parentCategories = [];
				   		for (let i = 0; i < data.length; i++)
				   		{	//console.log(data[i].get());
				   			let category = data[i].get();
				   			if (category.ParentId === null || category.ParentId === 0)
				   			{
				   				parentCategories.push({
				   					id: category.CategoryId,
				   					name: category.CategoryName,
				   					number: 0,
				   					subCategories: []
				   				});
				   			}
				   			else if (category.ParentId)
				   			{
				   				let parentCategory = parentCategories.find(x => x.id === category.ParentId);
				   				parentCategory.number += category.NumberOfProducts;
				   				parentCategory.subCategories.push({
				   					id: category.CategoryId,
				   					name: category.CategoryName
				   				});

				   				//console.log(parentCategory);
				   			}				   			
				   		}

				   		resolve(parentCategories);
				   });
		});
	},
	GetBrandsByCategoryId: function(categoryId){
		return new Promise(function(resolve, reject) {
			db.Brands
			   .findAll({
			   		attributes: [ 
			   			'BrandId', 
			   			'BrandName',
			   			[Sequelize.fn('COUNT', Sequelize.col('ProductId')), 'NumberOfProducts'] 
			   			],
			   		group: [ 'BrandId', 'BrandName' ],
			   		include: {
			   			model: db.Products,
			   			as: 'products',
			   			where: {
			   				CategoryId: categoryId
			   			}
			   		}
			   }).then(data => {
				   	let brands = data.map(x => {
				   		let brand = x.get();
				   		return {
				   			id: brand.BrandId,
				   			name: brand.BrandName,
				   			number: brand.NumberOfProducts
				   		}
					});
				   	resolve(brands);
			   });
		});
	}
};

module.exports = productBusiness;