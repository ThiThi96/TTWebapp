const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { UserBusiness: userBusiness } = require('../BLL');
const { ProductBusiness: productBusiness } = require('../BLL');

const userController = {
  RegisterIndex(req, res) {
    productBusiness.GetCategories()
      .then((categories) => {
        if (!req.user) {
          res.render('register', {
            categories,
          });
        } else {
          res.render('index', {
            user: req.user,
            categories,
          });
        }
      });
  },
  async AddUser(req, res) {
    const user = {
      Email: req.body.email,
      Password: req.body.password,
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Birthdate: req.body.birthdate ? req.body.birthdate : null,
      Address: req.body.address,
    };
    const userWithSameEmail = await userBusiness.GetUser(user.Email);
    const getCategories = productBusiness.GetCategories();
    if (userWithSameEmail) {
      return res.render('register', {
        error: true,
        categories: await getCategories,
      });
    }
    const saltRounds = 10;
    const hashPassAndCreateUser = bcrypt.hash(req.body.password, saltRounds)
      .then((hash) => {
        user.Password = hash;
        return userBusiness.AddUser(user);
      });
    return Promise.all([getCategories, hashPassAndCreateUser])
      .then((values) => {
        res.render('register', {
          categories: values[0],
          userId: values[1].UserId,
        });
      }).catch(() => {
        res.render('register', {
          error: true,
        });
      });
  },
  LogIn(req, res) {
    // eslint-disable-next-line consistent-return
    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user,
        });
      }
      const jwtPayload = {
        id: user.UserId,
      };
      const expireTime = 10 * 24 * 60 * 60 * 1000;
      const token = jwt.sign(jwtPayload, 'your_jwt_secret');

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: expireTime,
      });
      res.redirect('back');
    })(req, res);
  },
  LogOut(req, res) {
    if (req.cookies.jwt) {
      res.clearCookie('jwt');
    }
    res.send('1');
  },
  GetUserDetails(req, res) {
    if (req.user && req.user.id === req.params.userId) {
      const getUserDetails = userBusiness.GetUserById(req.user.id);
      const getCategories = productBusiness.GetCategories();
      return Promise.all([getUserDetails, getCategories])
        .then((values) => {
          const user = {
            id: values[0].UserId,
            name: `${values[0].FirstName} ${values[0].LastName}`,
            isNotFromFb: values[0].FacebookId == null,
          };
          res.render('customer', {
            user,
            categories: values[1],
          });
        });
    }
    return res.render('404', {
      user: req.user,
    });
  },
  LogInByFacebook(req, res) {
    // eslint-disable-next-line consistent-return
    passport.authenticate('facebook', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user,
        });
      }
      const jwtPayload = {
        id: user.UserId,
      };
      const expireTime = 10 * 24 * 60 * 60 * 1000;
      const token = jwt.sign(jwtPayload, 'your_jwt_secret');

      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: expireTime,
      });
      res.redirect('back');
    })(req, res);
  },
};

module.exports = userController;
