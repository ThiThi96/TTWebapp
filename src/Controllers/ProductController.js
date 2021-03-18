/* eslint-disable max-len */
const productBusiness = require('../BLL').ProductBusiness;

const productController = {
  GetProducts(req, res) {
    const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
    const numberOfItems = req.query.numberOfItems ? parseInt(req.query.numberOfItems, 10) : 6;
    const promises = [];
    const getCategories = productBusiness.GetCategories();
    promises.push(getCategories);
    let getProducts;
    if (req.query.categoryId) {
      getProducts = productBusiness.GetProductsByCategoryId(req.query.categoryId, offset, numberOfItems);
      const getTotal = productBusiness.GetNumberOfProductsByCategoryId(req.query.categoryId);
      const getBrandsByCategoryId = productBusiness.GetBrandsByCategoryId(req.query.categoryId);
      Array.prototype.push.apply(promises, [getProducts, getBrandsByCategoryId, getTotal]);
    } else if (req.query.keyword) {
      getProducts = productBusiness.GetProductsByKeyword(req.query.keyword, offset, numberOfItems);
      promises.push(getProducts);
    }

    return Promise.all(promises).then((values) => {
      const total = values[3];
      const numberOfPages = total % numberOfItems !== 0 ? parseInt(total / numberOfItems, 10) + 1 : parseInt(total / numberOfItems, 10);
      res.render('product.hbs', {
        products: values[1],
        categories: values[0],
        brands: values[2],
        categoryId: req.query.categoryId,
        user: req.user,
        numberOfItemsPerPage: numberOfItems,
        total,
        offset,
        numberOfPages,
      });
    });
  },
  GetProductById(req, res) {
    if (req.params.productId) {
      const cookie = req.cookies.products;
      const promises = [];
      let product;
      const getProductAndBrands = productBusiness.GetProductById(req.params.productId)
        .then((data) => {
          product = data;
          return productBusiness.GetBrandsByCategoryId(product.categoryId);
        });

      const getCategories = productBusiness.GetCategories();
      Array.prototype.push.apply(promises, [getProductAndBrands, getCategories]);
      if (cookie) {
        const getViewedProducts = productBusiness.GetProductsByIds(cookie.slice(-3).map((x) => x.id));
        const counts = {};
        for (let i = 0; i < cookie.length; i += 1) {
          const { categoryId } = cookie[i];
          counts[categoryId] = counts[categoryId] ? counts[categoryId] + 1 : 1;
        }

        const mostViewedCategoryId = parseInt(Object.keys(counts).find((x) => counts[x] === Math.max(...Object.values(counts))), 10);
        const getRecommendedProducts = productBusiness.GetProductsByCategoryId(mostViewedCategoryId, 0, 3);
        Array.prototype.push.apply(promises, [getViewedProducts, getRecommendedProducts]);
      }
      return Promise.all(promises).then((values) => {
        if (cookie) {
          if (!cookie.some((x) => x.id === req.params.productId)) {
            cookie.push({
              id: req.params.productId,
              categoryId: product.categoryId,
            });
            res.cookie('products', cookie);
          }
        } else {
          res.cookie('products', [{
            id: req.params.productId,
            categoryId: product.categoryId,
          }]);
        }
        res.render('product-detail.hbs', {
          categories: values[1],
          brands: values[0],
          product,
          recommendedProducts: values[3],
          viewedProducts: values[2],
          user: req.user,
        });
      });
    }
    return null;
  },
};

module.exports = productController;
