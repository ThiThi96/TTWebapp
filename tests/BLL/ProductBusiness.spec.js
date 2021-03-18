/* eslint-disable max-len */
const db = require('@/DAL/Models');
const models = require('@/BLL/Models');
const productBusiness = require('@/BLL/ProductBusiness');

jest.mock('@/BLL/Models', () => ({
  Product: jest.fn(),
  ProductDetail: jest.fn(),
  Category: jest.fn(),
  Brand: jest.fn(),
}));

describe('ProductBusiness', () => {
  beforeEach(async () => {
    await db.ProductDetails.destroy({
      where: {},
      force: true,
    });
    await db.Products.destroy({
      where: {},
      force: true,
    });
    await db.Brands.destroy({
      where: {},
      force: true,
    });
    await db.Categories.destroy({
      where: {},
      force: true,
    });
  });
  describe('GetProductsByCategoryId', () => {
    it('should get a correct number of products by categoryId from offset and order the list by a specific field at the provided order when all params are provided', async () => {
      // arrange
      const categoryId = 1;
      const offset = 0;
      const numberOfItems = 3;
      const orderBy = 'Price';
      const isDesc = true;

      const product = await db.Products.create({ CategoryId: 1, ProductName: 'Fancy Dress', Price: 300 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Royal Gown', Price: 200 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Sweet Corset', Price: 250 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Fabulous Top', Price: 210 });
      // act
      const result = await productBusiness.GetProductsByCategoryId(categoryId, offset, numberOfItems, orderBy, isDesc);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isDescByPrice = data.map((x) => x.Price).every((e, i, a) => !i || a[i - 1] >= e);
      expect(isDescByPrice).toBeTruthy();
      const correctCategoryId = data.reduce((allCorrect, item) => allCorrect && item.CategoryId === 1, true);
      expect(correctCategoryId).toBeTruthy();
      expect(data.length).toEqual(3);
      // check if offset = 0
      expect(data[0].ProductId).toEqual(product.ProductId);
    });

    it('should get a correct number of products by categoryId from offset and order the list by productName by default at the provided order when all params are provided except orderBy field', async () => {
      // arrange
      const categoryId = 1;
      const offset = 1;
      const numberOfItems = 3;
      const isDesc = false;

      await db.Products.create({ CategoryId: 1, ProductName: 'Evening Dress', Price: 300 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Royal Gown', Price: 200 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Sweet Corset', Price: 250 });
      const product = await db.Products.create({ CategoryId: 1, ProductName: 'Fabulous Top', Price: 210 });
      // act
      const result = await productBusiness.GetProductsByCategoryId(categoryId, offset, numberOfItems, null, isDesc);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isAscByProductName = data.map((x) => x.ProductName).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByProductName).toBeTruthy();
      const correctCategoryId = data.reduce((allCorrect, item) => allCorrect && item.CategoryId === 1, true);
      expect(correctCategoryId).toBeTruthy();
      expect(data.length).toEqual(3);
      // check if offset = 1
      expect(data[0].ProductId).toEqual(product.ProductId);
    });

    it('should get a correct number of products by categoryId from offset and order the list by a specific field at ascendingly by default when all params are provided except isDesc', async () => {
      // arrange
      const categoryId = 1;
      const offset = 2;
      const numberOfItems = 3;
      const orderBy = 'Price';

      await db.Products.create({ CategoryId: 1, ProductName: 'Fancy Dress', Price: 300 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Royal Gown', Price: 200 });
      const product = await db.Products.create({ CategoryId: 1, ProductName: 'Sweet Corset', Price: 250 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Fabulous Top', Price: 210 });
      // act
      const result = await productBusiness.GetProductsByCategoryId(categoryId, offset, numberOfItems, orderBy);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isAscByPrice = data.map((x) => x.Price).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByPrice).toBeTruthy();
      const correctCategoryId = data.reduce((allCorrect, item) => allCorrect && item.CategoryId === 1, true);
      expect(correctCategoryId).toBeTruthy();
      expect(data.length).toBeLessThanOrEqual(3);
      // check if offset = 2
      expect(data[0].ProductId).toEqual(product.ProductId);
    });
    it('should return null when categoryId is not provided', async () => {
      // arrange
      const categoryId = undefined;

      // act
      const result = await productBusiness.GetProductsByCategoryId(categoryId);

      // assert
      expect(result).toBeNull();
    });
  });

  describe('GetNumberOfProductsByCategoryId', () => {
    it('should get the correct number of products by provided categoryId', async () => {
      // arrange
      const categoryId = 1;
      await db.Products.create({ CategoryId: 1, ProductName: 'Fancy Dress', Price: 300 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Royal Gown', Price: 200 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Sweet Corset', Price: 250 });
      await db.Products.create({ CategoryId: 1, ProductName: 'Fabulous Top', Price: 210 });

      // act
      const result = await productBusiness.GetNumberOfProductsByCategoryId(categoryId);

      // assert
      expect(result).toEqual(4);
    });

    it('should return 0 when there is no categoryId provided', async () => {
      // arrange
      const categoryId = undefined;

      // act
      const result = await productBusiness.GetNumberOfProductsByCategoryId(categoryId);

      // assert
      expect(result).toEqual(0);
    });
  });

  describe('GetCategories', () => {
    it('should work correctly when there are only parent categories in which the parentId is null', async () => {
      // arrange
      await db.Categories.create({ CategoryId: 1, CategoryName: 'Dress', ParentId: null });
      await db.Categories.create({ CategoryId: 2, CategoryName: 'Top', ParentId: null });

      // act
      const result = await productBusiness.GetCategories();

      // assert
      expect(result.length).toEqual(2);
      expect(models.Category).toHaveBeenCalledTimes(2);
      const data = Array.prototype.concat.apply([], models.Category.mock.calls).sort((a, b) => a.CategoryId - b.CategoryId);
      expect(data[0].CategoryId).toEqual(1);
      expect(data[1].CategoryId).toEqual(2);
      expect(result[0].subCategories).toBeUndefined();
      expect(result[1].subCategories).toBeUndefined();
    });

    it('should work correctly when there are only parent categories in which the parentId is 0', async () => {
      // arrange
      await db.Categories.create({ CategoryId: 1, CategoryName: 'Dress', ParentId: 0 });
      await db.Categories.create({ CategoryId: 2, CategoryName: 'Top', ParentId: 0 });

      // act
      const result = await productBusiness.GetCategories();

      // assert
      expect(result.length).toEqual(2);
      expect(models.Category).toHaveBeenCalledTimes(2);
      const data = Array.prototype.concat.apply([], models.Category.mock.calls).sort((a, b) => a.CategoryId - b.CategoryId);
      expect(data[0].CategoryId).toEqual(1);
      expect(data[1].CategoryId).toEqual(2);
      expect(result[0].subCategories).toBeUndefined();
      expect(result[1].subCategories).toBeUndefined();
    });

    it('should work correctly when there are parent and child categories also', async () => {
      // arrange
      await db.Categories.create({ CategoryId: 1, CategoryName: 'Dress', ParentId: null });
      await db.Categories.create({ CategoryId: 2, CategoryName: 'Top', ParentId: 0 });
      await db.Categories.create({ CategoryId: 3, ParentId: 1, CategoryName: 'Kid Dress' });
      await db.Categories.create({ CategoryId: 4, ParentId: 2, CategoryName: 'Male Top' });

      models.Category.mockImplementation(({ CategoryId }) => ({
        id: CategoryId,
        subCategories: [],
      }));

      // act
      const result = await productBusiness.GetCategories();

      // assert
      expect(result.length).toEqual(2);
      expect(models.Category).toHaveBeenCalledTimes(4);
      const data = Array.prototype.concat.apply([], models.Category.mock.calls).sort((a, b) => a.CategoryId - b.CategoryId);
      expect(data[0].CategoryId).toEqual(1);
      expect(data[1].CategoryId).toEqual(2);
      expect(data[2].CategoryId).toEqual(3);
      expect(data[3].CategoryId).toEqual(4);
      const sortedResult = result.sort((a, b) => a.CategoryId - b.CategoryId);
      expect(sortedResult[0].subCategories[0].id).toEqual(3);
      expect(sortedResult[1].subCategories[0].id).toEqual(4);
    });
  });

  describe('GetBrandsByCategoryId', () => {
    it('should get correct brands from provided categoryId', async () => {
      // arrange
      const categoryId = 1;

      await db.Categories.create({ CategoryId: 1, CategoryName: 'Dress', ParentId: null });
      await db.Brands.create({ BrandId: 1, BrandName: 'Dottie' });
      await db.Products.create({ ProductName: 'Pretty Sparks', BrandId: 1, CategoryId: 1 });
      await db.Products.create({ ProductName: 'Impress', BrandId: 1, CategoryId: 1 });
      await db.Brands.create({ BrandId: 2, BrandName: 'Marc' });
      await db.Products.create({ ProductName: 'First Impression', BrandId: 2, CategoryId: 1 });

      // act
      await productBusiness.GetBrandsByCategoryId(categoryId);

      // assert
      expect(models.Brand).toHaveBeenCalledTimes(2);
      const data = Array.prototype.concat.apply([], models.Brand.mock.calls).sort((a, b) => a.BrandId - b.BrandId);
      expect(data[0].BrandId).toEqual(1);
      expect(data[1].BrandId).toEqual(2);
      expect(data[0].NumberOfProducts).toEqual(2);
      expect(data[1].NumberOfProducts).toEqual(1);
    });
  });

  describe('GetProductById', () => {
    it('should get the correct product and its details of the corresponding id', async () => {
      // arrange
      const productId = 1;

      await db.Products.create({ ProductId: 1, ProductName: 'Pretty Sparks' });
      await db.ProductDetails.create({ ProductId: 1, ProductDetailId: 1, SizeId: 1 });

      // act
      await productBusiness.GetProductById(productId);

      // assert
      expect(models.ProductDetail).toHaveBeenCalledTimes(1);
      const detailParams = models.ProductDetail.mock.calls[0][0];
      expect(detailParams.ProductDetailId).toEqual(1);
      expect(models.Product).toHaveBeenCalled();
      const productParams = models.Product.mock.calls[0];
      expect(productParams[0].ProductId).toEqual(1);
      expect(productParams[1][0]).toBeInstanceOf(models.ProductDetail);
    });
  });

  describe('GetProductsByIds', () => {
    it('should get available products in db by ids provided when all input ids are in db', async () => {
      // arrange
      const ids = [1, 2, 3];

      await db.Products.create({ ProductId: 1, ProductName: 'Product1' });
      await db.Products.create({ ProductId: 2, ProductName: 'Product2' });
      await db.Products.create({ ProductId: 3, ProductName: 'Product3' });

      // act
      await productBusiness.GetProductsByIds(ids);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(3);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls).sort((a, b) => a.ProductId - b.ProductId);
      expect(data[0].ProductId).toEqual(1);
      expect(data[1].ProductId).toEqual(2);
      expect(data[2].ProductId).toEqual(3);
    });

    it('should get available products in db by ids provided when not all input ids are in db', async () => {
      // arrange
      const ids = [1, 2, 3];

      await db.Products.create({ ProductId: 1, ProductName: 'Product1' });
      await db.Products.create({ ProductId: 2, ProductName: 'Product2' });

      // act
      await productBusiness.GetProductsByIds(ids);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(2);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls).sort((a, b) => a.ProductId - b.ProductId);
      expect(data[0].ProductId).toEqual(1);
      expect(data[1].ProductId).toEqual(2);
    });
  });

  describe('GetProductsByKeyword', () => {
    it('should get a correct number of products by keyword in product name from offset and order the list by a specific field at the provided order when all params are provided', async () => {
      // arrange
      const keyword = 'gown';
      const offset = 0;
      const numberOfItems = 3;
      const orderBy = 'Price';
      const isDesc = true;

      await db.Products.create({
        ProductId: 1, CategoryId: 1, ProductName: 'Fancy Dress', Price: 300,
      });
      await db.Products.create({
        ProductId: 2, CategoryId: 1, ProductName: 'Royal Gown', Price: 200,
      });
      await db.Products.create({
        ProductId: 3, CategoryId: 1, ProductName: 'Sweet Gown', Price: 250,
      });
      await db.Products.create({
        ProductId: 4, CategoryId: 1, ProductName: 'Fabulous Top', Price: 210,
      });
      // act
      await productBusiness.GetProductsByKeyword(keyword, offset, numberOfItems, orderBy, isDesc);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(2);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isDescByPrice = data.map((x) => x.Price).every((e, i, a) => !i || a[i - 1] >= e);
      expect(isDescByPrice).toBeTruthy();
      const containKeyword = data.reduce((allCorrect, item) => allCorrect && item.ProductName.toLowerCase().includes(keyword), true);
      expect(containKeyword).toBeTruthy();
      expect(data.length).toEqual(2);
      // check if offset = 0
      expect(data[0].ProductId).toEqual(3);
    });

    it('should get a correct number of products by keyword in product name from offset and order the list by productName by default at the provided order when all params are provided except orderBy field', async () => {
      // arrange
      const keyword = 'gown';
      const offset = 1;
      const numberOfItems = 3;
      const isDesc = false;

      await db.Products.create({
        ProductId: 1, CategoryId: 1, ProductName: 'Evening Gown', Price: 300,
      });
      await db.Products.create({
        ProductId: 2, CategoryId: 1, ProductName: 'Royal Gown', Price: 200,
      });
      await db.Products.create({ ProductId: 3, ProductName: 'Sweet Corset', Price: 250 });
      await db.Products.create({ ProductId: 4, ProductName: 'Fabulous Gown', Price: 210 });
      // act
      const result = await productBusiness.GetProductsByKeyword(keyword, offset, numberOfItems, null, isDesc);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isAscByProductName = data.map((x) => x.ProductName).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByProductName).toBeTruthy();
      const containKeyword = data.reduce((allCorrect, item) => allCorrect && item.ProductName.toLowerCase().includes(keyword), true);
      expect(containKeyword).toBeTruthy();
      expect(data.length).toEqual(2);
      // check if offset = 1
      expect(data[0].ProductId).toEqual(4);
    });

    it('should get a correct number of products by keyword in product name from offset and order the list by a specific field at ascendingly by default when all params are provided except isDesc', async () => {
      // arrange
      const keyword = 'gown';
      const offset = 2;
      const numberOfItems = 3;
      const orderBy = 'Price';

      await db.Products.create({
        ProductId: 1, CategoryId: 1, ProductName: 'Fancy gown', Price: 300,
      });
      await db.Products.create({
        ProductId: 2, CategoryId: 1, ProductName: 'Royal Gown', Price: 200,
      });
      await db.Products.create({
        ProductId: 3, CategoryId: 1, ProductName: 'Sweet Corset', Price: 250,
      });
      await db.Products.create({
        ProductId: 4, CategoryId: 1, ProductName: 'Fabulous gown', Price: 210,
      });
      // act
      const result = await productBusiness.GetProductsByKeyword(keyword, offset, numberOfItems, orderBy);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isAscByPrice = data.map((x) => x.Price).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByPrice).toBeTruthy();
      const containKeyword = data.reduce((allCorrect, item) => allCorrect && item.ProductName.toLowerCase().includes(keyword), true);
      expect(containKeyword).toBeTruthy();
      expect(data.length).toBeLessThanOrEqual(3);
      // check if offset = 2
      expect(data[0].ProductId).toEqual(1);
    });

    it('should get a correct number of products by keyword in description from offset and order the list by a specific field at the provided order when all params are provided', async () => {
      // arrange
      const keyword = 'date';
      const offset = 0;
      const numberOfItems = 3;
      const orderBy = 'Price';
      const isDesc = true;

      await db.Products.create({
        ProductId: 1, CategoryId: 1, ProductName: 'Fancy Dress', Price: 300, Description: 'This pretty thing can be worn in many special occasions',
      });
      await db.Products.create({
        ProductId: 2, CategoryId: 1, ProductName: 'Royal Gown', Price: 200, Description: 'This pretty thing can be worn in many special occasions, like dates, dining out, wedding parties',
      });
      await db.Products.create({
        ProductId: 3, CategoryId: 1, ProductName: 'Sweet Gown', Price: 250, Description: 'This pretty thing can be worn in many special occasions, like dates, dining out, wedding parties',
      });
      await db.Products.create({
        ProductId: 4, CategoryId: 1, ProductName: 'Fabulous Top', Price: 210, Description: 'This pretty thing can be worn in many special occasions',
      });
      // act
      await productBusiness.GetProductsByKeyword(keyword, offset, numberOfItems, orderBy, isDesc);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(2);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isDescByPrice = data.map((x) => x.Price).every((e, i, a) => !i || a[i - 1] >= e);
      expect(isDescByPrice).toBeTruthy();
      const containKeyword = data.reduce((allCorrect, item) => allCorrect && item.Description.toLowerCase().includes(keyword), true);
      expect(containKeyword).toBeTruthy();
      expect(data.length).toEqual(2);
      // check if offset = 0
      expect(data[0].ProductId).toEqual(3);
    });

    it('should get a correct number of products by keyword in description  from offset and order the list by productName by default at the provided order when all params are provided except orderBy field', async () => {
      // arrange
      const keyword = 'date';
      const offset = 0;
      const numberOfItems = 3;
      const isDesc = false;

      await db.Products.create({
        ProductId: 1, CategoryId: 1, ProductName: 'Fancy Dress', Price: 300, Description: 'This pretty thing can be worn in many special occasions',
      });
      await db.Products.create({
        ProductId: 2, CategoryId: 1, ProductName: 'Royal Gown', Price: 200, Description: 'This pretty thing can be worn in many special occasions, like dates, dining out, wedding parties',
      });
      await db.Products.create({
        ProductId: 3, CategoryId: 1, ProductName: 'Sweet Gown', Price: 250, Description: 'This pretty thing can be worn in many special occasions, like dining out, wedding parties and on dates of course',
      });
      await db.Products.create({
        ProductId: 4, CategoryId: 1, ProductName: 'Fabulous Top', Price: 210, Description: 'This pretty thing can be worn in many special occasions especially on dates',
      });
      // act
      const result = await productBusiness.GetProductsByKeyword(keyword, offset, numberOfItems, null, isDesc);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isAscByProductName = data.map((x) => x.ProductName).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByProductName).toBeTruthy();
      const containKeyword = data.reduce((allCorrect, item) => allCorrect && item.Description.toLowerCase().includes(keyword), true);
      expect(containKeyword).toBeTruthy();
      expect(data.length).toEqual(3);
      // check if offset = 0
      expect(data[0].ProductId).toEqual(4);
    });

    it('should get a correct number of products by keyword in description  from offset and order the list by a specific field at ascendingly by default when all params are provided except isDesc', async () => {
      // arrange
      const keyword = 'parties';
      const offset = 1;
      const numberOfItems = 3;
      const orderBy = 'Price';

      await db.Products.create({
        ProductId: 1, CategoryId: 1, ProductName: 'Fancy Dress', Price: 300, Description: 'This pretty thing can be worn in many special occasions',
      });
      await db.Products.create({
        ProductId: 2, CategoryId: 1, ProductName: 'Royal Gown', Price: 200, Description: 'This pretty thing can be worn in many special occasions, like dates, dining out, wedding parties',
      });
      await db.Products.create({
        ProductId: 3, CategoryId: 1, ProductName: 'Sweet Gown', Price: 250, Description: 'This pretty thing can be worn in many special occasions, like dining out, wedding parties and on dates of course',
      });
      await db.Products.create({
        ProductId: 4, CategoryId: 1, ProductName: 'Fabulous Top', Price: 210, Description: 'This pretty thing can be worn in many special occasions especially on dates',
      });
      // act
      const result = await productBusiness.GetProductsByKeyword(keyword, offset, numberOfItems, orderBy);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isAscByPrice = data.map((x) => x.Price).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByPrice).toBeTruthy();
      const containKeyword = data.reduce((allCorrect, item) => allCorrect && item.Description.toLowerCase().includes(keyword), true);
      expect(containKeyword).toBeTruthy();
      expect(data.length).toBeLessThanOrEqual(3);
      // check if offset = 1
      expect(data[0].ProductId).toEqual(3);
    });

    it('should get a correct number of products by keyword in brand name from offset and order the list by a specific field at the provided order when all params are provided', async () => {
      // arrange
      const keyword = 'marc';
      const offset = 0;
      const numberOfItems = 3;
      const orderBy = 'Price';
      const isDesc = true;

      await db.Brands.create({
        BrandId: 1, BrandName: 'Marc',
      });
      await db.Brands.create({
        BrandId: 2, BrandName: 'Dottie',
      });
      await db.Products.create({
        ProductId: 1, CategoryId: 1, ProductName: 'Fancy Dress', Price: 300, BrandId: 1,
      });
      await db.Products.create({
        ProductId: 2, CategoryId: 1, ProductName: 'Royal Gown', Price: 200, BrandId: 1,
      });
      await db.Products.create({
        ProductId: 3, CategoryId: 1, ProductName: 'Sweet Gown', Price: 250, BrandId: 1,
      });
      await db.Products.create({
        ProductId: 4, CategoryId: 1, ProductName: 'Fabulous Top', Price: 210, BrandId: 2,
      });

      // act
      await productBusiness.GetProductsByKeyword(keyword, offset, numberOfItems, orderBy, isDesc);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(3);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isDescByPrice = data.map((x) => x.Price).every((e, i, a) => !i || a[i - 1] >= e);
      expect(isDescByPrice).toBeTruthy();
      const containKeyword = data.reduce((allCorrect, item) => allCorrect && item.BrandId === 1, true);
      expect(containKeyword).toBeTruthy();
      expect(data.length).toEqual(3);
      // check if offset = 0
      expect(data[0].ProductId).toEqual(1);
    });

    it('should get a correct number of products by keyword in brand name from offset and order the list by productName by default at the provided order when all params are provided except orderBy field', async () => {
      // arrange
      const keyword = 'marc';
      const offset = 1;
      const numberOfItems = 3;
      const isDesc = false;

      await db.Brands.create({
        BrandId: 1, BrandName: 'Marc',
      });
      await db.Brands.create({
        BrandId: 2, BrandName: 'Dottie',
      });
      await db.Products.create({
        ProductId: 1, CategoryId: 1, ProductName: 'Fancy Dress', Price: 300, BrandId: 1,
      });
      await db.Products.create({
        ProductId: 2, CategoryId: 1, ProductName: 'Royal Gown', Price: 200, BrandId: 1,
      });
      await db.Products.create({
        ProductId: 3, CategoryId: 1, ProductName: 'Sweet Gown', Price: 250, BrandId: 1,
      });
      await db.Products.create({
        ProductId: 4, CategoryId: 1, ProductName: 'Fabulous Top', Price: 210, BrandId: 2,
      });
      // act
      const result = await productBusiness.GetProductsByKeyword(keyword, offset, numberOfItems, null, isDesc);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isAscByProductName = data.map((x) => x.ProductName).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByProductName).toBeTruthy();
      const containKeyword = data.reduce((allCorrect, item) => allCorrect && item.BrandId === 1, true);
      expect(containKeyword).toBeTruthy();
      expect(data.length).toEqual(2);
      // check if offset = 1
      expect(data[0].ProductId).toEqual(2);
    });

    it('should get a correct number of products by keyword in brand name from offset and order the list by a specific field at ascendingly by default when all params are provided except isDesc', async () => {
      // arrange
      const keyword = 'dottie';
      const offset = 2;
      const numberOfItems = 3;
      const orderBy = 'Price';

      await db.Brands.create({
        BrandId: 2, BrandName: 'Dottie',
      });
      await db.Products.create({
        ProductId: 1, CategoryId: 1, ProductName: 'Fancy Dress', Price: 300, BrandId: 2,
      });
      await db.Products.create({
        ProductId: 2, CategoryId: 1, ProductName: 'Royal Gown', Price: 200, BrandId: 2,
      });
      await db.Products.create({
        ProductId: 3, CategoryId: 1, ProductName: 'Sweet Gown', Price: 250, BrandId: 2,
      });
      await db.Products.create({
        ProductId: 4, CategoryId: 1, ProductName: 'Fabulous Top', Price: 210, BrandId: 2,
      });
      // act
      const result = await productBusiness.GetProductsByKeyword(keyword, offset, numberOfItems, orderBy);

      // assert
      expect(models.Product).toHaveBeenCalledTimes(result.length);
      const data = Array.prototype.concat.apply([], models.Product.mock.calls);
      const isAscByPrice = data.map((x) => x.Price).every((e, i, a) => !i || a[i - 1] <= e);
      expect(isAscByPrice).toBeTruthy();
      const containKeyword = data.reduce((allCorrect, item) => allCorrect && item.BrandId === 2, true);
      expect(containKeyword).toBeTruthy();
      expect(data.length).toBeLessThanOrEqual(3);
      // check if offset = 2
      expect(data[0].ProductId).toEqual(3);
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
