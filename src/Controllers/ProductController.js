let models = require('../ViewModels/ViewModels');
let productBusiness = require('../BLL').ProductBusiness;

let productController = {
	GetProducts: function(req, res){
		let offset = req.query['offset'] ? parseInt(req.query['offset']) : 0;
		let numberOfItems = req.query['numberOfItems'] ? parseInt(req.query['numberOfItems']) : 6;
		let promises = [];
		let getCategories = productBusiness.GetCategories();
		promises.push(getCategories);
		if (req.query['categoryId'])
		{
			getProducts = productBusiness.GetProductsByCategoryId(req.query['categoryId'], offset, numberOfItems);
			getTotal = productBusiness.GetNumberOfProductsByCategoryId(req.query['categoryId']);
			getBrandsByCategoryId = productBusiness.GetBrandsByCategoryId(req.query['categoryId']);
			Array.prototype.push.apply(promises, [getProducts, getBrandsByCategoryId, getTotal]);
		}
		else if (req.query['keyword'])
		{
			getProducts = productBusiness.GetProductsByKeyword(req.query['keyword'], offset, numberOfItems);
			promises.push(getProducts);
		}


		Promise.all(promises).then((values) => {
			let total = values[3];
			let numberOfPages = total % numberOfItems != 0 ? parseInt(total/numberOfItems) + 1 : parseInt(total/numberOfItems);
			res.render('product.hbs', {
				products: values[1],
				categories: values[0],
				brands: values[2],
				categoryId: req.query['categoryId'],
				user: req.user,
				numberOfItemsPerPage: numberOfItems,
				total: total,
				offset: offset,
				numberOfPages: numberOfPages
			});		  
		});

	},
	GetProductById: function(req, res){
		if (req.params['productId'])
		{
			let cookie = req.cookies['products'];
			let promises = [];
			let product = undefined;
			let getProductAndBrands = productBusiness.GetProductById(req.params['productId'])
													 .then(data => {
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
					counts[categoryId] = counts[categoryId] ? counts[categoryId] + 1 : 1;
				}
				
				let mostViewedCategoryId = Object.keys(counts).find(x => counts[x] === Math.max(Object.values(counts)));
				let getRecommendedProducts = productBusiness.GetProductsByCategoryId(mostViewedCategoryId, 0, 3);
				Array.prototype.push.apply(promises, [getViewedProducts, getRecommendedProducts]);

			}
			Promise.all(promises).then((values) => {
				if (cookie)
			 	{
			 		if (!cookie.some(x => x.id === req.params['productId'])){
				 		cookie.push({
							id: req.params['productId'],
							categoryId: product.categoryId
						});
						res.cookie('products', cookie);			 			
			 		}
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
					recommendedProducts: values[3],
					viewedProducts: values[2],
					user: req.user
				});	
			});
		}

	}
};

module.exports = productController;