const productController = require('@/Controllers/ProductController');
const productBusiness = require('@/BLL/ProductBusiness');

// (Mock) First mock the module, list method to be mocked
jest.mock('@/BLL/ProductBusiness', () => ({
  GetCategories: jest.fn(),
  GetProductsByCategoryId: jest.fn(),
  GetNumberOfProductsByCategoryId: jest.fn(),
  GetBrandsByCategoryId: jest.fn(),
  GetProductsByKeyword: jest.fn(),
  GetProductById: jest.fn(),
  GetProductsByIds: jest.fn(),
}));

describe('ProductController', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('GetProducts', () => {
    it('should get the correct number of products at the right page from the corresponding category when categoryId, numberOfItems, offset are specified', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          categoryId: 5,
          numberOfItems: 5,
          offset: 1,
        },
        user: 'userTest',
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductsByCategoryId.mockImplementation(() => Promise.resolve([]));
      productBusiness.GetNumberOfProductsByCategoryId.mockImplementation(() => Promise.resolve(10));
      productBusiness.GetBrandsByCategoryId.mockImplementation(() => Promise.resolve(['Edini', 'Dottie']));

      // act
      await productController.GetProducts(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalledWith(5, 1, 5);
      expect(productBusiness.GetNumberOfProductsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetNumberOfProductsByCategoryId).toHaveBeenCalledWith(5);
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalledWith(5);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product.hbs', {
        products: [],
        categories: 'Test',
        brands: ['Edini', 'Dottie'],
        categoryId: 5,
        user: 'userTest',
        numberOfItemsPerPage: 5,
        total: 10,
        offset: 1,
        numberOfPages: 2,
      });
    });
    it('should get 6 products at page 1 from the corresponding category when only categoryId is specified', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          categoryId: 5,
        },
        user: 'userTest',
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductsByCategoryId.mockImplementation(() => Promise.resolve([]));
      productBusiness.GetNumberOfProductsByCategoryId.mockImplementation(() => Promise.resolve(10));
      productBusiness.GetBrandsByCategoryId.mockImplementation(() => Promise.resolve(['Edini', 'Dottie']));

      // act
      await productController.GetProducts(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalledWith(5, 0, 6);
      expect(productBusiness.GetNumberOfProductsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetNumberOfProductsByCategoryId).toHaveBeenCalledWith(5);
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalledWith(5);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product.hbs', {
        products: [],
        categories: 'Test',
        brands: ['Edini', 'Dottie'],
        categoryId: 5,
        user: 'userTest',
        numberOfItemsPerPage: 6,
        total: 10,
        offset: 0,
        numberOfPages: 2,
      });
    });
    it('should get 6 products at the right page from the corresponding category when categoryId, offset are specified', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          categoryId: 5,
          offset: 1,
        },
        user: 'userTest',
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductsByCategoryId.mockImplementation(() => Promise.resolve([]));
      productBusiness.GetNumberOfProductsByCategoryId.mockImplementation(() => Promise.resolve(10));
      productBusiness.GetBrandsByCategoryId.mockImplementation(() => Promise.resolve(['Edini', 'Dottie']));

      // act
      await productController.GetProducts(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalledWith(5, 1, 6);
      expect(productBusiness.GetNumberOfProductsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetNumberOfProductsByCategoryId).toHaveBeenCalledWith(5);
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalledWith(5);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product.hbs', {
        products: [],
        categories: 'Test',
        brands: ['Edini', 'Dottie'],
        categoryId: 5,
        user: 'userTest',
        numberOfItemsPerPage: 6,
        total: 10,
        offset: 1,
        numberOfPages: 2,
      });
    });
    it('should get the correct number of products at the page 1 from the corresponding category when categoryId, numberOfItems are specified', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          categoryId: 7,
          numberOfItems: 8,
        },
        user: 'userTest',
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductsByCategoryId.mockImplementation(() => Promise.resolve([]));
      productBusiness.GetNumberOfProductsByCategoryId.mockImplementation(() => Promise.resolve(21));
      productBusiness.GetBrandsByCategoryId.mockImplementation(() => Promise.resolve(['Edini', 'Dottie']));

      // act
      await productController.GetProducts(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalledWith(7, 0, 8);
      expect(productBusiness.GetNumberOfProductsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetNumberOfProductsByCategoryId).toHaveBeenCalledWith(7);
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalledWith(7);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product.hbs', {
        products: [],
        categories: 'Test',
        brands: ['Edini', 'Dottie'],
        categoryId: 7,
        user: 'userTest',
        numberOfItemsPerPage: 8,
        total: 21,
        offset: 0,
        numberOfPages: 3,
      });
    });
    it('should get the correct number of products, whose name or description or brand name contains some words, at the right page when keyword, numberOfItems, offset are specified', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          keyword: 'kw',
          numberOfItems: 5,
          offset: 1,
        },
        user: 'userTest',
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductsByKeyword.mockImplementation(() => Promise.resolve([]));

      // act
      await productController.GetProducts(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductsByKeyword).toHaveBeenCalled();
      expect(productBusiness.GetProductsByKeyword).toHaveBeenCalledWith('kw', 1, 5);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product.hbs', {
        products: [],
        categories: 'Test',
        brands: undefined,
        categoryId: undefined,
        user: 'userTest',
        numberOfItemsPerPage: 5,
        total: undefined,
        offset: 1,
        numberOfPages: NaN,
      });
    });
    it('should get 6 products, whose name or description or brand name contains some words, at page 1 when only keyword is specified', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          keyword: 'kw',
        },
        user: 'userTest',
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductsByKeyword.mockImplementation(() => Promise.resolve([]));

      // act
      await productController.GetProducts(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductsByKeyword).toHaveBeenCalled();
      expect(productBusiness.GetProductsByKeyword).toHaveBeenCalledWith('kw', 0, 6);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product.hbs', {
        products: [],
        categories: 'Test',
        brands: undefined,
        categoryId: undefined,
        user: 'userTest',
        numberOfItemsPerPage: 6,
        total: undefined,
        offset: 0,
        numberOfPages: NaN,
      });
    });
    it('should get 6 products, whose name or description or brand name contains some words, at the right page when keyword, offset are specified', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          keyword: 'kw',
          offset: 1,
        },
        user: 'userTest',
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductsByKeyword.mockImplementation(() => Promise.resolve([]));

      // act
      await productController.GetProducts(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductsByKeyword).toHaveBeenCalled();
      expect(productBusiness.GetProductsByKeyword).toHaveBeenCalledWith('kw', 1, 6);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product.hbs', {
        products: [],
        categories: 'Test',
        brands: undefined,
        categoryId: undefined,
        user: 'userTest',
        numberOfItemsPerPage: 6,
        total: undefined,
        offset: 1,
        numberOfPages: NaN,
      });
    });
    it('should get the correct number of products, whose name or description or brand name contains some words, at page 1 when keyword, numberOfItems are specified', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        query: {
          keyword: 'kw',
          numberOfItems: 5,
        },
        user: 'userTest',
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductsByKeyword.mockImplementation(() => Promise.resolve([]));

      // act
      await productController.GetProducts(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductsByKeyword).toHaveBeenCalled();
      expect(productBusiness.GetProductsByKeyword).toHaveBeenCalledWith('kw', 0, 5);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product.hbs', {
        products: [],
        categories: 'Test',
        brands: undefined,
        categoryId: undefined,
        user: 'userTest',
        numberOfItemsPerPage: 5,
        total: undefined,
        offset: 0,
        numberOfPages: NaN,
      });
    });
  });

  describe('GetProductById', () => {
    it('should only get product details by its id and add product details to cookie when there is no history', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        params: {
          productId: 5,
        },
        user: 'userTest',
        cookies: {},
      };
      const res = {
        render: spy,
        cookie: jest.fn(),
      };
      const fakeProduct = { id: 5, categoryId: 2 };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductById.mockImplementation(() => Promise.resolve(fakeProduct));
      productBusiness.GetBrandsByCategoryId.mockImplementation(() => Promise.resolve(['Edini', 'Dottie']));

      // act
      await productController.GetProductById(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductById).toHaveBeenCalled();
      expect(productBusiness.GetProductById).toHaveBeenCalledWith(5);
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalledWith(2);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product-detail.hbs', {
        categories: 'Test',
        brands: ['Edini', 'Dottie'],
        product: fakeProduct,
        recommendedProducts: undefined,
        viewedProducts: undefined,
        user: 'userTest',
      });
      expect(res.cookie).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledWith('products', [fakeProduct]);
    });
    it('should get product details by its id, viewed products and recommendation and add product details to cookie when there is history', async () => {
      // arrange
      const spy = jest.fn();
      const fakeCookie = {
        products: [
          {
            id: 4,
            categoryId: 6,
          },
          {
            id: 2,
            categoryId: 5,
          },
          {
            id: 6,
            categoryId: 2,
          },
          {
            id: 7,
            categoryId: 3,
          },
          {
            id: 1,
            categoryId: 6,
          },
          {
            id: 8,
            categoryId: 6,
          },
        ],
      };
      const req = {
        params: {
          productId: 5,
        },
        user: 'userTest',
        cookies: fakeCookie,
      };
      const res = {
        render: spy,
        cookie: jest.fn(),
      };
      const fakeProduct = { id: 5, categoryId: 2 };
      const newCookies = [...fakeCookie.products, fakeProduct];

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));
      productBusiness.GetProductById.mockImplementation(() => Promise.resolve(fakeProduct));
      productBusiness.GetBrandsByCategoryId.mockImplementation(() => Promise.resolve(['Edini', 'Dottie']));
      productBusiness.GetProductsByIds.mockImplementation(() => Promise.resolve(['viewed1', 'viewed2']));
      productBusiness.GetProductsByCategoryId.mockImplementation(() => Promise.resolve(['rec1', 'rec2']));

      // act
      await productController.GetProductById(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(productBusiness.GetProductById).toHaveBeenCalled();
      expect(productBusiness.GetProductById).toHaveBeenCalledWith(5);
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetBrandsByCategoryId).toHaveBeenCalledWith(2);
      expect(productBusiness.GetProductsByIds).toHaveBeenCalled();
      expect(productBusiness.GetProductsByIds).toHaveBeenCalledWith([7, 1, 8]);
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalled();
      expect(productBusiness.GetProductsByCategoryId).toHaveBeenCalledWith(6, 0, 3);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('product-detail.hbs', {
        categories: 'Test',
        brands: ['Edini', 'Dottie'],
        product: fakeProduct,
        recommendedProducts: ['rec1', 'rec2'],
        viewedProducts: ['viewed1', 'viewed2'],
        user: 'userTest',
      });
      expect(res.cookie).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledWith('products', newCookies);
    });
    it('should return null when there is no id specified', async () => {
      // arrange
      const req = {
        params: {

        },
      };
      const res = {
        render: jest.fn(),
      };

      // act
      const result = await productController.GetProductById(req, res);

      // assert
      expect(result).toBeNull();
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
