const models = require('../ViewModels/ViewModels');
const orderBusiness = require('../BLL').OrderBusiness;
const productBusiness = require('../BLL').ProductBusiness;

const orderController = {
  GetOrdersByUserId(req, res) {
    if (req.user && req.user.id === req.params.userId) {
      const { userId } = req.params;
      const getCategories = productBusiness.GetCategories();
      const getUserOrders = orderBusiness.GetOrdersByUserId(userId);
      return Promise.all([getCategories, getUserOrders]).then((values) => {
        res.render('customer-order', {
          categories: values[0],
          orders: values[1],
          statusEnums: models.Order.statusEnums,
          user: req.user,
        });
      });
    }
    return productBusiness.GetCategories()
      .then((categories) => {
        res.render('404', {
          categories,
          user: req.user,
        });
      });
  },
  GetOrderById(req, res) {
    const { orderId } = req.params;
    const promises = [productBusiness.GetCategories()];
    if (req.user && orderId) {
      const getOrder = orderBusiness.GetOrderDetailsById(orderId)
        .then((order) => {
          if (order && order.userId === req.user.id) {
            return order;
          }
          return null;
        });
      promises.push(getOrder);
    }
    return Promise.all(promises).then((values) => {
      if (values[1]) {
        res.render('customer-order-detail',
          {
            categories: values[0],
            order: values[1],
            user: req.user,
          });
      } else {
        productBusiness.GetCategories()
          .then((categories) => {
            res.render('404', {
              categories,
              user: req.user,
            });
          });
      }
    });
  },
  // AddOrder(req, res) {
  //   res.render('customer-order-detail');
  // },
  // AddProductToBasket() {

  // },
  GetBasketByUserId(req, res) {
    res.render('basket', {
      order: models.Order.orders[0],
      recommendedProducts: models.Product.slice(0, 3),
    });
  },
  // RemoveProductFromOrder(req, res) {
  //   res.send('success');
  // },
};

module.exports = orderController;
