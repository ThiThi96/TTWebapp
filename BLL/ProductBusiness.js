let db = require('../DAL/Models');

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
						 		image: product.Image,
						 		categoryId: product.CategoryId
					 		}

					 	});
					 	resolve(products);
					 });
			});
	},
	GetNumberOfProductsByCategoryId: function(categoryId){
		return db.Products.count({
			where:{
				categoryId: categoryId
			}
		}).then(data => {
			return data;
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
				   			[db.Sequelize.fn('COUNT', db.Sequelize.col('ProductId')), 'NumberOfProducts'] 
				   		], 
				   		group: [ "CategoryId", "CategoryName", "ParentId"],
				   		include: {
				   			model: db.Products,
				   			as: 'products'
				   		}
				   })
				   .then(data => {
				   		let parentCategories = [];
				   		for (let i = 0; i < data.length; i++)
				   		{	
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
			   			[db.Sequelize.fn('COUNT', db.Sequelize.col('ProductId')), 'NumberOfProducts'] 
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
			   		console.log('get brands done');
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
	},
	GetProductById: function(productId){
		let getProduct = db.Products
						   .findOne({
						   		where: {
						   			productId: productId
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
							 	]
						   	});
		let getProductDetails = db.ProductDetails
								  .findAll({
								  	attributes: [ 'ProductDetailId', 'Size.SizeId', 'Size.SizeName', 'ProductId' ],
								  	include: {
								  		model: db.Sizes
								  	},
								  	where: {
								  		ProductId: productId
								  	}
								  });
		return Promise.all([getProduct, getProductDetails])
					  .then(data => {
					  	let product = {
						 		id: data[0].ProductId,
						 		name: data[0].ProductName,
						 		price: data[0].Price,
						 		description: data[0].Description,
						 		brand: data[0].brand != undefined ? data[0].brand.BrandName : "",
						 		category: data[0].category != undefined ? data[0].category.CategoryName : "",
						 		image: data[0].Image,
						 		categoryId: data[0].CategoryId,
						 		details: data[1]
					 		};
					  	return product;
					  });
	},
	GetProductsByIds: function(productIds){
		return new Promise(function(resolve, reject) {
			db.Products
				.findAll({
					where: {
						ProductId: productIds
				 	}
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
					 		image: product.Image,
					 		categoryId: product.CategoryId
				 		}

				 	});
				 	resolve(products);
				 });
		});
	},
	GetProductsByKeyword: function(keyword, offset, numberOfItems, orderBy, isDesc){
		return db.Products
				 .findAll({
				 	where: {
				 		[db.Sequelize.Op.or]: [
				 			{
				 				ProductName: {
				 					[db.Sequelize.Op.like]: `%${keyword}%`
				 				}
				 			},
				 			{
				 				Description: {
				 					[db.Sequelize.Op.like]: `%${keyword}%`
				 				}
				 			},
				 			{
				 				'$Brand.BrandName$': {
				 					[db.Sequelize.Op.like]: `%${keyword}%`
				 				}
				 			}
				 		]
				 	},
				 	include: {
				 		model: db.Brands,
				 		as: 'brand'
				 	},
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
						 		image: product.Image,
						 		categoryId: product.CategoryId
					 		}

					 	});
				 	return products;
				 });
	}
};

module.exports = productBusiness;