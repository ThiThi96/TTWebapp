let models = require('../ViewModels/ViewModels');
let productBusiness = require('../BLL').ProductBusiness;

let productController = {
	GetProducts: function(req, res){
		let getProducts = undefined;
		if (req.query['categoryId'])
		{
			let offset = req.query['offset'] ? req.query['offset'] : 0;
			let numberOfItems = req.query['numberOfItems'] ? req.query['numberOfItems'] : 6;
			getProducts = productBusiness.GetCategories(categoryId, offset, numberOfItems);
		}
		let getCategories = productBusiness.GetCategories();
		let getBrandsByCategoryId = productBusiness.GetBrandsByCategoryId(9);

		Promise.all([getProducts, getCategories, getBrandsByCategoryId]).then((values) => {
			res.render('product.hbs', {
				products: values[0],
				categories: values[1],
				brands: values[2]
			});		  
		});

	},
	GetProductById: function(req, res){
		res.render('product-detail.hbs', {
			categories: models.Category,
			brands: models.Brand,
			colours: models.Colour,
			product: models.Product[0],
			recommendedProducts: models.Product.slice(0, 3),
			viewedProducts: models.Product.slice(0, 3)
		});
	}
};

module.exports = productController;