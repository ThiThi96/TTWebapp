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
					 		return {
						 		id: x.get().ProductId,
						 		name: x.get().ProductName,
						 		price: x.get().Price,
						 		description: x.get().Description,
						 		brand: x.get().brand.BrandName,
						 		category: x.get().category.CategoryName,
						 		image: x.get().Image
					 		}

					 	});
					 	resolve(products);
					 });
			});
	},
	GetCategories: function(){
		return new Promise(function(resolve, reject){
				db.Categories
				   .findAll()
				   .then(data => {
				   		resolve(data);
				   });
		});
	}
};

module.exports = productBusiness;