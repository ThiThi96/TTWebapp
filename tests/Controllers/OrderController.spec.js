/* eslint-disable max-len */
const orderController = require('@/Controllers/OrderController');
const productBusiness = require('@/BLL/ProductBusiness');
const orderBusiness = require('@/BLL/orderBusiness');
const models = require('@/ViewModels/ViewModels');

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

jest.mock('@/BLL/orderBusiness', () => ({
  GetOrdersByUserId: jest.fn(),
  GetOrderDetailsById: jest.fn(),
}));

describe('ProductController', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('GetOrdersByUserId', () => {
    it('should get the correct orders when user id in req params is the logged in user\'s id', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        params: {
          userId: 1,
        },
        user: {
          id: 1,
        },
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));
      orderBusiness.GetOrdersByUserId.mockImplementation(() => Promise.resolve(['order1', 'order2']));

      // act
      await orderController.GetOrdersByUserId(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(orderBusiness.GetOrdersByUserId).toHaveBeenCalled();
      expect(orderBusiness.GetOrdersByUserId).toHaveBeenCalledWith(1);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('customer-order', {
        categories: ['Dresses', 'Top'],
        orders: ['order1', 'order2'],
        statusEnums: models.Order.statusEnums,
        user: req.user,
      });
    });

    it('should return 404 if user id in req params is not the logged in user\'s id', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        params: {
          userId: 1,
        },
        user: {
          id: 2,
        },
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));

      // act
      await orderController.GetOrdersByUserId(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('404', {
        categories: ['Dresses', 'Top'],
        user: req.user,
      });
    });

    it('should return 404 if user doesn\'t log in', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        params: {
          userId: 1,
        },
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));

      // act
      await orderController.GetOrdersByUserId(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('404', {
        categories: ['Dresses', 'Top'],
        user: req.user,
      });
    });
  });

  describe('GetOrderById', () => {
    it('should get order by its id when logged user is the owner and order id is provided', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        params: {
          orderId: 3,
        },
        user: {
          id: 1,
        },
      };
      const res = {
        render: spy,
      };
      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));
      orderBusiness.GetOrderDetailsById.mockImplementation(() => Promise.resolve({ id: 3, total: 400, userId: 1 }));

      // act
      await orderController.GetOrderById(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(orderBusiness.GetOrderDetailsById).toHaveBeenCalled();
      expect(orderBusiness.GetOrderDetailsById).toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('customer-order-detail',
        {
          categories: ['Dresses', 'Top'],
          order: { id: 3, total: 400, userId: 1 },
          user: req.user,
        });
    });

    it('should return 404 when user doesn\'t log in', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        params: {
          orderId: 3,
        },
      };
      const res = {
        render: spy,
      };
      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));

      // act
      await orderController.GetOrderById(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('404', {
        categories: ['Dresses', 'Top'],
        user: req.user,
      });
    });

    it('should return 404 when order id is not provided', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        user: {
          id: 1,
        },
        params: {
        },
      };
      const res = {
        render: spy,
      };
      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));

      // act
      await orderController.GetOrderById(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('404', {
        categories: ['Dresses', 'Top'],
        user: req.user,
      });
    });

    it('should return 404 when order id is provided but logged user is not the owner', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        params: {
          orderId: 3,
        },
        user: {
          id: 1,
        },
      };
      const res = {
        render: spy,
      };
      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));
      orderBusiness.GetOrderDetailsById.mockImplementation(() => Promise.resolve({ id: 3, total: 400, userId: 2 }));

      // act
      await orderController.GetOrderById(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(orderBusiness.GetOrderDetailsById).toHaveBeenCalled();
      expect(orderBusiness.GetOrderDetailsById).toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('404', {
        categories: ['Dresses', 'Top'],
        user: req.user,
      });
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
