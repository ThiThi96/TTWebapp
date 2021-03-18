const homeController = require('@/Controllers/HomeController');
const productBusiness = require('@/BLL/ProductBusiness');

/* The idea is to develop a unit test by following these 3 simple steps:
1. Arrange – setup the testing objects and prepare the prerequisites for your test.
2. Act – perform the actual work of the test.
3. Assert – verify the result.
*/

// (Mock) First mock the module, list method to be mocked
jest.mock('@/BLL/ProductBusiness', () => ({
  GetCategories: jest.fn(),
}));

// Describe a groups of unit tests. This file is too simple that should have only 1
describe('HomeController', () => {
  // Have to reset all mocks here
  beforeEach(() => {
    jest.resetModules();
  });

  it('should call productBusiness.GetCategories correctly when calling Index', async () => {
    // 1.Arrange
    const renderSpy = jest.fn();
    const req = {
      user: 'testUser',
    };
    const res = {
      render: renderSpy,
    };

    // (Mock) Then implement the method we want to mock here
    productBusiness.GetCategories.mockImplementation(() => Promise.resolve('Test'));

    // 2. Act
    await homeController.Index(req, res);

    // 3. Assert
    expect(renderSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledWith('index', {
      user: 'testUser',
      categories: 'Test',
    });
  });
});
