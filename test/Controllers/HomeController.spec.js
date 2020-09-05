import homeController from '@/Controllers/HomeController';
import productBusiness from '@/BLL/ProductBusiness';

jest.mock('@/BLL/ProductBusiness', () => {
  return {
    GetCategories: jest.fn(() => Promise.resolve('Test'))
  }
});

describe('HomeController', () => {
  it('should call productBusiness.GetCategories correctly when calling Index', async () => {
    let renderSpy = jest.fn();
    let req = {
      user: 'testUser'
    };
    let res = {
      render: renderSpy
    };

    await homeController.Index(req, res);

    expect(renderSpy).toHaveBeenCalled();
    expect(renderSpy).toHaveBeenCalledWith('index', {
      user: 'testUser',
      categories: 'Test'
    });
  })
})