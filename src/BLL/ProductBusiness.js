const db = require('../DAL/Models');
const models = require('./Models');

const productBusiness = {
  GetProductsByCategoryId(categoryId, offset, numberOfItems, orderBy, isDesc) {
    if (!categoryId) { return null; }
    return new Promise((resolve, reject) => {
      db.Products
        .findAll({
          where: {
            CategoryId: categoryId,
          },
          include: [
            {
              model: db.Brands,
              as: 'brand',
            },
            {
              model: db.Categories,
              as: 'category',
            },
          ],
          limit: numberOfItems,
          offset,
          order: [[orderBy || 'ProductName', isDesc ? 'DESC' : 'ASC']],
        }).then((data) => {
          const products = data.map((x) => {
            const product = x.get();
            // return {
            // id: product.ProductId,
            // name: product.ProductName,
            // price: product.Price,
            // description: product.Description,
            // brand: product.brand != undefined ? product.brand.BrandName : "",
            // category: product.category != undefined ? product.category.CategoryName : "",
            // image: product.Image,
            // categoryId: product.CategoryId
            // }
            return new models.Product(product);
          });
          resolve(products);
        }, (err) => reject(err));
    });
  },
  GetNumberOfProductsByCategoryId(categoryId) {
    if (!categoryId) return 0;
    return db.Products.count({
      where: {
        categoryId,
      },
    }).then((data) => data);
  },
  GetCategories() {
    return new Promise((resolve, reject) => {
      db.Categories
        .findAll({
          attributes: [
            'CategoryId',
            'CategoryName',
            'ParentId',
            [db.Sequelize.fn('COUNT', db.Sequelize.col('ProductId')), 'NumberOfProducts'],
          ],
          group: ['CategoryId', 'CategoryName', 'ParentId'],
          include: {
            model: db.Products,
            as: 'products',
          },
        })
        .then((data) => {
          const parentCategories = [];
          for (let i = 0; i < data.length; i += 1) {
            const category = data[i].get();
            if (category.ParentId === null || category.ParentId === 0) {
              // parentCategories.push({
              // id: category.CategoryId,
              // name: category.CategoryName,
              // number: 0,
              // subCategories: []
              // });
              parentCategories.push(new models.Category(category));
            } else if (category.ParentId) {
              const parentCategory = parentCategories.find((x) => x.id === category.ParentId);
              parentCategory.number += category.NumberOfProducts;
              // parentCategory.subCategories.push({
              // id: category.CategoryId,
              // name: category.CategoryName
              // });
              parentCategory.subCategories.push(new models.Category(category));
            }
          }

          resolve(parentCategories);
        }, (err) => reject(err));
    });
  },
  GetBrandsByCategoryId(categoryId) {
    return new Promise((resolve, reject) => {
      db.Brands
        .findAll({
          attributes: [
            'BrandId',
            'BrandName',
            [db.Sequelize.fn('COUNT', db.Sequelize.col('ProductId')), 'NumberOfProducts'],
          ],
          group: ['BrandId', 'BrandName'],
          include: {
            model: db.Products,
            as: 'products',
            where: {
              CategoryId: categoryId,
            },
          },
        }).then((data) => {
          const brands = data.map((x) => {
            const brand = x.get();
            // return {
            // id: brand.BrandId,
            // name: brand.BrandName,
            // number: brand.NumberOfProducts
            // }

            return new models.Brand(brand);
          });
          resolve(brands);
        }, (err) => reject(err));
    });
  },
  GetProductById(productId) {
    const getProduct = db.Products
      .findOne({
        where: {
          productId,
        },
        include: [
          {
            model: db.Brands,
            as: 'brand',
          },
          {
            model: db.Categories,
            as: 'category',
          },
        ],
      });
    const getProductDetails = db.ProductDetails
      .findAll({
        attributes: ['ProductDetailId', 'ProductId'],
        include: {
          model: db.Sizes,
        },
        where: {
          ProductId: productId,
        },
      });
    return Promise.all([getProduct, getProductDetails])
      .then((data) => {
        const product = data[0].get();
        const details = data[1].map((x) => new models.ProductDetail(x.get()));
        return new models.Product(product, details);
      });
    // const product = {
    //   id: data[0].ProductId,
    //   name: data[0].ProductName,
    //   price: data[0].Price,
    //   description: data[0].Description,
    //   brand: data[0].brand !== undefined ? data[0].brand.BrandName : '',
    //   category: data[0].category !== undefined ? data[0].category.CategoryName : '',
    //   image: data[0].Image,
    //   categoryId: data[0].CategoryId,
    //   details: data[1],
    // };
  },
  GetProductsByIds(productIds) {
    return new Promise((resolve, reject) => {
      db.Products
        .findAll({
          where: {
            ProductId: productIds,
          },
        }).then((data) => {
          const products = data.map((x) => {
            const product = x.get();
            // return {
            // id: product.ProductId,
            // name: product.ProductName,
            // price: product.Price,
            // description: product.Description,
            // brand: product.brand != undefined ? product.brand.BrandName : "",
            // category: product.category != undefined ? product.category.CategoryName : "",
            // image: product.Image,
            // categoryId: product.CategoryId
            // }
            return new models.Product(product);
          });
          resolve(products);
        }, (err) => reject(err));
    });
  },
  GetProductsByKeyword(keyword, offset, numberOfItems, orderBy, isDesc) {
    return db.Products
      .findAll({
        where: {
          [db.Sequelize.Op.or]: [
            {
              ProductName: {
                [db.Sequelize.Op.like]: `%${keyword}%`,
              },
            },
            {
              Description: {
                [db.Sequelize.Op.like]: `%${keyword}%`,
              },
            },
            {
              '$Brand.BrandName$': {
                [db.Sequelize.Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
        include: {
          model: db.Brands,
          as: 'brand',
        },
        limit: numberOfItems,
        offset,
        order: [[orderBy || 'ProductName', isDesc ? 'DESC' : 'ASC']],
      }).then((data) => {
        const products = data.map((x) => {
          const product = x.get();
          // return {
          // id: product.ProductId,
          // name: product.ProductName,
          // price: product.Price,
          // description: product.Description,
          // brand: product.brand != undefined ? product.brand.BrandName : "",
          // category: product.category != undefined ? product.category.CategoryName : "",
          // image: product.Image,
          // categoryId: product.CategoryId
          // }
          return new models.Product(product);
        });
        return products;
      });
  },
};

module.exports = productBusiness;
