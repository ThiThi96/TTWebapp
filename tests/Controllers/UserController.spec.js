const userBusiness = require('@/BLL/UserBusiness');
const productBusiness = require('@/BLL/ProductBusiness');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userController = require('@/Controllers/UserController');

// (Mock) First mock the module, list method to be mocked
jest.mock('@/BLL/UserBusiness', () => ({
  GetUser: jest.fn(),
  AddUser: jest.fn(),
  GetUserById: jest.fn(),
}));

jest.mock('@/BLL/ProductBusiness', () => ({
  GetCategories: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('passport', () => ({
  authenticate: jest.fn(),
}));

describe('UserController', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe('RegisterIndex', () => {
    it('should show register page when user does not log in', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));

      // act
      await userController.RegisterIndex(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('register', {
        categories: ['Dresses', 'Top'],
      });
    });
    it('should show index page when user already logged in', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        user: 'userTest',
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));

      // act
      await userController.RegisterIndex(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('index', {
        user: req.user,
        categories: ['Dresses', 'Top'],
      });
    });
  });

  describe('AddUser', () => {
    it('should add user successfully when no one else uses the same email and show register page with the success message', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        body: {
          email: 'test@gmail.com',
          password: 'password',
          firstName: 'Daphne',
          lastName: 'Bridgeton',
          birthdate: '10/05/1997',
          address: '123 random street',
        },
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));
      userBusiness.GetUser.mockImplementation(() => Promise.resolve(undefined));
      bcrypt.hash.mockImplementation(() => Promise.resolve('hashedPassword'));
      userBusiness.AddUser.mockImplementation(() => Promise.resolve({ UserId: 1, Email: 'test@gmail.com' }));

      // act
      await userController.AddUser(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(userBusiness.GetUser).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('password', parseInt(process.env.PASSWORD_SALT, 10));
      expect(userBusiness.AddUser).toHaveBeenCalled();
      expect(userBusiness.AddUser).toHaveBeenCalledWith({
        Email: 'test@gmail.com',
        Password: 'hashedPassword',
        FirstName: 'Daphne',
        LastName: 'Bridgeton',
        Birthdate: '10/05/1997',
        Address: '123 random street',
      });
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('register', {
        categories: ['Dresses', 'Top'],
        userId: 1,
      });
    });

    it('should show register page with the error message if the email is already used', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        body: {
          email: 'test@gmail.com',
          password: 'password',
          firstName: 'Daphne',
          lastName: 'Bridgeton',
        },
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));
      userBusiness.GetUser.mockImplementation(() => Promise.resolve({ id: 1, email: 'test@gmail.com' }));

      // act
      await userController.AddUser(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(userBusiness.GetUser).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('register', {
        categories: ['Dresses', 'Top'],
        error: true,
      });
    });

    it('should show register page with the error message if there is error creating the user', async () => {
      // arrange
      const spy = jest.fn();
      const req = {
        body: {
          email: 'test@gmail.com',
          password: 'password',
          firstName: 'Daphne',
          lastName: 'Bridgeton',
          birthdate: '10/05/1997',
          address: '123 random street',
        },
      };
      const res = {
        render: spy,
      };

      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));
      userBusiness.GetUser.mockImplementation(() => Promise.resolve(undefined));
      bcrypt.hash.mockImplementation(() => Promise.resolve('hashedPassword'));
      userBusiness.AddUser.mockImplementation(() => Promise.reject(new Error('fail')));

      // act
      await userController.AddUser(req, res);

      // assert
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(userBusiness.GetUser).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(userBusiness.AddUser).toHaveBeenCalled();
      expect(userBusiness.AddUser).toHaveBeenCalledWith({
        Email: 'test@gmail.com',
        Password: 'hashedPassword',
        FirstName: 'Daphne',
        LastName: 'Bridgeton',
        Birthdate: '10/05/1997',
        Address: '123 random street',
      });
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('register', {
        error: true,
      });
    });
  });

  describe('LogIn', () => {
    it('should redirect to the previous page and store user token into cookie when user logs in successfully', async () => {
      // arrange
      const req = {};
      const res = {
        redirect: jest.fn(),
        cookie: jest.fn(),
      };
      const expireTime = 10 * 24 * 60 * 60 * 1000;

      passport.authenticate.mockImplementation((type, options, callback) => {
        callback(null, {
          UserId: 1,
          Email: 'test@gmail.com',
        });
        return jest.fn();
      });
      jwt.sign.mockImplementation(() => 'userToken');

      // act
      await userController.LogIn(req, res);

      // assert
      expect(passport.authenticate).toHaveBeenCalled();
      expect(passport.authenticate).toHaveBeenCalledWith('local', { session: false }, expect.any(Function));
      expect(jwt.sign).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith({
        id: 1,
      }, 'your_jwt_secret');
      expect(res.cookie).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledWith('jwt', 'userToken', {
        httpOnly: true,
        sameSite: true,
        maxAge: expireTime,
      });
      expect(res.redirect).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('back');
    });

    it('should return status 400 when there is an error while logging', async () => {
      // arrange
      const req = {};
      const res = {
        status: jest.fn(),
      };
      const jsonSpy = jest.fn();

      passport.authenticate.mockImplementation((type, options, callback) => {
        callback(new Error('Wrong email or password'), null);
        return jest.fn();
      });
      res.status.mockImplementation(() => ({ json: jsonSpy }));

      // act
      await userController.LogIn(req, res);

      // assert
      expect(passport.authenticate).toHaveBeenCalled();
      expect(passport.authenticate).toHaveBeenCalledWith('local', { session: false }, expect.any(Function));
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalled();
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Something is not right',
        user: null,
      });
    });
  });

  describe('GetUserDetails', () => {
    it('should return user details when the logged in user id is the id in the request', async () => {
      // arrange
      const req = {
        user: {
          id: 1,
        },
        params: {
          userId: 1,
        },
      };
      const res = {
        render: jest.fn(),
      };

      userBusiness.GetUserById.mockImplementation(() => Promise.resolve({
        UserId: 1,
        FirstName: 'Daphne',
        LastName: 'Bridgeton',
        FacebookId: null,
      }));
      productBusiness.GetCategories.mockImplementation(() => Promise.resolve(['Dresses', 'Top']));

      // act
      await userController.GetUserDetails(req, res);

      // assert
      expect(userBusiness.GetUserById).toHaveBeenCalled();
      expect(userBusiness.GetUserById).toHaveBeenCalledWith(1);
      expect(productBusiness.GetCategories).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith('customer', {
        user: {
          id: 1,
          name: 'Daphne Bridgeton',
          isNotFromFb: true,
        },
        categories: ['Dresses', 'Top'],
      });
    });

    it('should return 404 when the user does not log in', async () => {
      // arrange
      const req = {
        params: {
          userId: 1,
        },
      };
      const res = {
        render: jest.fn(),
      };

      // act
      await userController.GetUserDetails(req, res);

      // assert
      expect(res.render).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith('404', {
        user: undefined,
      });
    });

    it('should return 404 when the user requests to see details of different user', async () => {
      // arrange
      const req = {
        user: {
          id: 1,
        },
        params: {
          userId: 2,
        },
      };
      const res = {
        render: jest.fn(),
      };

      // act
      await userController.GetUserDetails(req, res);

      // assert
      expect(res.render).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith('404', {
        user: {
          id: 1,
        },
      });
    });
  });

  describe('LogInByFacebook', () => {
    it('should redirect to the previous page and store user token into cookie when user logs in successfully', async () => {
      // arrange
      const req = {};
      const res = {
        redirect: jest.fn(),
        cookie: jest.fn(),
      };
      const expireTime = 10 * 24 * 60 * 60 * 1000;

      passport.authenticate.mockImplementation((type, options, callback) => {
        callback(null, {
          UserId: 1,
          Email: 'test@gmail.com',
        });
        return jest.fn();
      });
      jwt.sign.mockImplementation(() => 'userToken');

      // act
      await userController.LogInByFacebook(req, res);

      // assert
      expect(passport.authenticate).toHaveBeenCalled();
      expect(passport.authenticate).toHaveBeenCalledWith('facebook', { session: false }, expect.any(Function));
      expect(jwt.sign).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith({
        id: 1,
      }, 'your_jwt_secret');
      expect(res.cookie).toHaveBeenCalled();
      expect(res.cookie).toHaveBeenCalledWith('jwt', 'userToken', {
        httpOnly: true,
        sameSite: true,
        maxAge: expireTime,
      });
      expect(res.redirect).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('back');
    });

    it('should return status 400 when there is an error while logging', async () => {
      // arrange
      const req = {};
      const res = {
        status: jest.fn(),
      };
      const jsonSpy = jest.fn();

      passport.authenticate.mockImplementation((type, options, callback) => {
        callback(new Error('Wrong email or password'), null);
        return jest.fn();
      });
      res.status.mockImplementation(() => ({ json: jsonSpy }));

      // act
      await userController.LogInByFacebook(req, res);

      // assert
      expect(passport.authenticate).toHaveBeenCalled();
      expect(passport.authenticate).toHaveBeenCalledWith('facebook', { session: false }, expect.any(Function));
      expect(res.status).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalled();
      expect(jsonSpy).toHaveBeenCalledWith({
        message: 'Something is not right',
        user: null,
      });
    });
  });

  describe('LogOut', () => {
    it('should clear user token in cookie and send success signal to client', () => {
      // arrange
      const res = {
        clearCookie: jest.fn(),
        send: jest.fn(),
      };
      const req = {
        cookies: {
          jwt: 'userCookie',
        },
      };

      // act
      userController.LogOut(req, res);

      // assert
      expect(res.clearCookie).toHaveBeenCalled();
      expect(res.clearCookie).toHaveBeenCalledWith('jwt');
      expect(res.send).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith('1');
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
