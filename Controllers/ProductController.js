let models = require('../ViewModels/ViewModels');
let productBusiness = require('../BLL').ProductBusiness;

let productController = {
	GetProducts: function(req, res){
		let getProducts = undefined;
		let getBrands = undefined;
		let offset = req.query['offset'] ? req.query['offset'] : 0;
		let numberOfItems = req.query['numberOfItems'] ? req.query['numberOfItems'] : 6;
		if (req.query['categoryId'])
		{
			getProducts = productBusiness.GetProductsByCategoryId(req.query['categoryId'], offset, numberOfItems);
			getBrandsByCategoryId = productBusiness.GetBrandsByCategoryId(req.query['categoryId']);
		}
		let getCategories = productBusiness.GetCategories();

		Promise.all([getProducts, getCategories, getBrandsByCategoryId]).then((values) => {
			res.render('product.hbs', {
				products: values[0],
				categories: values[1],
				brands: values[2]
			});		  
		});

	},
	GetProductById: function(req, res){
		if (req.params['productId'])
		{
			let cookie = req.cookies['products'];
			console.log(cookie);
			let promises = [];
			let product = undefined;
			let getProductAndBrands = productBusiness.GetProductById(req.params['productId'])
													 .then(data => {
													 	//console.log(data);
														product = data;
													 	return productBusiness.GetBrandsByCategoryId(product.categoryId);
													 });

			let getCategories = productBusiness.GetCategories();
			Array.prototype.push.apply(promises, [getProductAndBrands, getCategories]); 
			if (cookie)
			{
				let getViewedProducts = productBusiness.GetProductsByIds(cookie.slice(-3).map(x => { return x.id }));
				let counts = {};
				for (let i = 0; i < cookie.length;i++)
				{
					let categoryId = cookie[i].categoryId;
					counts[categoryId] = counts[categoryId] ? counts[categoryId + 1] : 1;
				}
				let mostViewedCategoryId = Object.keys(counts).find(x => counts[x] === Math.max(Object.values(counts)));
				let getRecommendedProducts = productBusiness.GetProductsByCategoryId(mostViewedCategoryId, 0, 3);
				promises.concat([getViewedProducts, getRecommendedProducts]);

			}
			Promise.all(promises).then((values) => {
				if (cookie)
			 	{
			 		cookie.push({
						id: req.params['productId'],
						categoryId: product.categoryId
					});
					res.cookie('products', cookie);
			 	}
			 	else
				{
					res.cookie('products', [{
						id: req.params['productId'],
						categoryId: product.categoryId
					}]);
				}
				res.render('product-detail.hbs', {
					categories: values[1],
					brands: values[0],
					product: product,
					recommendedProducts: values[3] ? values[3] : [],
					viewedProducts: values[2] ? values[2] : []
				});	
			});
		}

	}
};

module.exports = productController;