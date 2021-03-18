/* eslint-disable max-len */
const db = require('@/DAL/Models');
const models = require('@/BLL/Models');
const orderBusiness = require('@/BLL/OrderBusiness');

jest.mock('@/BLL/Models', () => ({
  Order: jest.fn(),
  OrderDetail: jest.fn(),
}));

describe('OrderBusiness', () => {
  beforeEach(async () => {
    await db.Orders.destroy({
      where: {},
      force: true,
    });
    await db.OrderDetails.destroy({
      where: {},
      force: true,
    });
    await db.Products.destroy({
      where: {},
      force: true,
    });
    await db.ProductDetails.destroy({
      where: {},
      force: true,
    });
  });
  describe('GetOrdersByUserId', () => {
    it('should get correct number of orders by userId from offset and order the list by a specific field at the provided order when all params are provided', async () => {
      // arrange
      const userId = 1;
      const offset = 0;
      const numberOfItems = 3;
      const orderBy = 'StatusId';
      const isDesc = true;

      await db.Orders.create({ UserId: 1, StatusId: 2, CreatedDate: db.sequelize.fn('NOW') });
      const order2 = await db.Orders.create({ UserId: 1, StatusId: 3, CreatedDate: db.sequelize.fn('NOW') });
      // act
      const result = await orderBusiness.GetOrdersByUserId(userId, offset, numberOfItems, orderBy, isDesc);

      // assert
      expect(models.Order).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Order.mock.calls);
      const isDescByStatusId = data.map((x) => x.StatusId).every((e, i, a) => !i || a[i - 1] >= e);
      expect(isDescByStatusId).toBeTruthy();
      const correctUserId = data.reduce((allCorrect, item) => allCorrect && item.UserId === 1, true);
      expect(correctUserId).toBeTruthy();
      expect(data.length).toBeLessThanOrEqual(3);
      // check if offset = 0
      expect(data[0].OrderId).toEqual(order2.OrderId);
    });

    it('should get correct number of orders by userId from offset and order the list by orderId by default at the provided order when all params are provided except orderBy field', async () => {
      // arrange
      const userId = 1;
      const offset = 0;
      const numberOfItems = 3;
      const isDesc = false;

      const order1 = await db.Orders.create({ UserId: 1, StatusId: 2, CreatedDate: db.sequelize.fn('NOW') });
      await db.Orders.create({ UserId: 1, StatusId: 3, CreatedDate: db.sequelize.fn('NOW') });
      // act
      const result = await orderBusiness.GetOrdersByUserId(userId, offset, numberOfItems, null, isDesc);

      // assert
      expect(models.Order).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Order.mock.calls);
      const isAscByOrderId = data.map((x) => x.OrderId).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByOrderId).toBeTruthy();
      const correctUserId = data.reduce((allCorrect, item) => allCorrect && item.UserId === 1, true);
      expect(correctUserId).toBeTruthy();
      expect(data.length).toBeLessThanOrEqual(3);
      // check if offset = 0
      expect(data[0].OrderId).toEqual(order1.OrderId);
    });

    it('should get correct number of orders by userId from offset and order the list by a specific field at ascendingly by default when all params are provided except isDesc', async () => {
      // arrange
      const userId = 1;
      const offset = 1;
      const numberOfItems = 3;
      const orderBy = 'StatusId';

      const order = await db.Orders.create({ UserId: 1, StatusId: 2, CreatedDate: db.sequelize.fn('NOW') });
      await db.Orders.create({ UserId: 1, StatusId: 3, CreatedDate: db.sequelize.fn('NOW') });
      await db.Orders.create({ UserId: 1, StatusId: 1, CreatedDate: db.sequelize.fn('NOW') });
      await db.Orders.create({ UserId: 1, StatusId: 3, CreatedDate: db.sequelize.fn('NOW') });
      // act
      const result = await orderBusiness.GetOrdersByUserId(userId, offset, numberOfItems, orderBy);

      // assert
      expect(models.Order).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Order.mock.calls);
      const isAscByStatusId = data.map((x) => x.StatusId).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByStatusId).toBeTruthy();
      const correctUserId = data.reduce((allCorrect, item) => allCorrect && item.UserId === 1, true);
      expect(correctUserId).toBeTruthy();
      expect(data.length).toEqual(3);
      // check if offset = 1
      expect(data[0].OrderId).toEqual(order.OrderId);
    });
    it('should return null when userId is not provided', async () => {
      // arrange
      const userId = undefined;

      // act
      const result = await orderBusiness.GetOrdersByUserId(userId);

      // assert
      expect(result).toBeNull();
    });
  });

  describe('GetOrderDetailsById', () => {
    it('should get correct order details by its id', async () => {
      // arrange
      const orderId = 1;

      await db.Orders.create({
        OrderId: 1, UserId: 1, StatusId: 2, CreatedDate: db.sequelize.fn('NOW'),
      });
      await db.OrderDetails.create({ OrderId: 1, ProductDetailId: 1, Quantity: 2 });
      await db.OrderDetails.create({ OrderId: 1, ProductDetailId: 2, Quantity: 3 });
      await db.Products.create({ ProductId: 1, ProductName: 'Gown', Price: '300' });
      await db.ProductDetails.create({
        ProductDetailId: 1, ProductId: 1, ColourId: 1, SizeId: 1, Number: 2,
      });
      await db.Products.create({ ProductId: 2, ProductName: 'Dress', Price: '400' });
      await db.ProductDetails.create({
        ProductDetailId: 2, ProductId: 2, ColourId: 1, SizeId: 1, Number: 2,
      });

      models.Order.mockImplementation(() => ({
        products: [],
      }));

      // act
      await orderBusiness.GetOrderDetailsById(orderId);

      // assert
      expect(models.Order).toHaveBeenCalled();
      const order = Array.prototype.concat.apply([], models.OrderDetail.mock.calls)[0];
      expect(order.OrderId).toEqual(1);
      const details = Array.prototype.concat.apply([], models.OrderDetail.mock.calls);
      expect(details.length).toEqual(2);
      const productIds = details.map((x) => x.ProductId).sort((a, b) => a - b);
      expect(productIds[0]).toEqual(1);
      expect(productIds[1]).toEqual(2);
    });

    it('should return null when there is no order found with provided id', async () => {
      // arrange
      const orderId = 1;

      // act
      const result = await orderBusiness.GetOrderDetailsById(orderId);

      // assert
      expect(result).toBeNull();
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
