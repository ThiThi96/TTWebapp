let productBusiness = require('../BLL').ProductBusiness;

let homeController = {
  Index: function (req, res) {
    productBusiness.GetCategories()
      .then(categories => {
        res.render('index', {
          user: req.user,
          categories: categories
        });
			})
			.catch();
  }
};

// module.exports = homeController;
export default homeController;
