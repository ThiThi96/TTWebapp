const productBusiness = require('../BLL').ProductBusiness;

const homeController = {
  Index(req, res) {
    productBusiness.GetCategories()
      .then((categories) => {
        res.render('index', {
          user: req.user,
          categories,
        });
      });
  },
};

module.exports = homeController;
