const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const JWTStrategy = passportJWT.Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const { UserBusiness: userBusiness } = require('../BLL');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  ((email, password, cb) => {
    let user;
    return userBusiness.GetUser(email)
      .then((data) => {
        user = data;
        return bcrypt.compare(password, user.Password);
      }, (err) => cb(err))
      .then((userFound) => {
        if (!userFound || !user) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }

        return cb(null, user);
      }, (err) => cb(err));
  })));
  passport.use(new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'your_jwt_secret',
  },
  ((jwtPayload, cb) => userBusiness.GetUserById(jwtPayload.id)
    .then((user) => cb(null, user), (err) => cb(err)))));
  passport.use(new FacebookStrategy({
    clientID: '306378963857132',
    clientSecret: 'ac34e81b6a1f5a5d90aaf038699f5772',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'gender', 'photos'],
  },
  ((accessToken, refreshToken, profile, cb) => userBusiness.GetOrAddUserByFacebookProfile(profile)
    .then((user) => cb(null, user), (err) => cb(err)))));
};
