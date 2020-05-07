let models = require('../ViewModels/ViewModels');
let productBusiness = require('../BLL').ProductBusiness;

let productController = {
	GetProducts: function(req, res){
		productBusiness.GetProductsByCategoryId(9, 0, 2)
						.then(data => {
							console.log(data);
						}).catch(err => {
							console.log(err);
						});
		res.render('product.hbs', {
			products: models.Product,
			categories: models.Category,
			brands: models.Brand,
			colours: models.Colour
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