let passportJWT = require("passport-jwt");
let ExtractJWT = passportJWT.ExtractJwt;
let LocalStrategy = require('passport-local').Strategy;
let JWTStrategy   = passportJWT.Strategy;
let userBusiness = require('../BLL').UserBusiness;
let bcrypt = require('bcrypt');
let FacebookStrategy = require('passport-facebook').Strategy; 

let cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

module.exports = function(passport){
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, cb) {
            let user = undefined;
            return userBusiness.GetUser(email)
                               .then(data => {
                                     user = data;
                                     return bcrypt.compare(password, user.Password);
                                   }, err => {
                                      return cb(err);
                                   })
                               .then(userFound => {
                                    if (!userFound || !user){
                                        return cb(null, false, {message: 'Incorrect email or password.'});
                                    }
                                   
                                    return cb(null, user);
                               }, err => {
                                    return cb(err);
                               });
        }
    ));
    passport.use(new JWTStrategy({
            jwtFromRequest: cookieExtractor,
            secretOrKey   : 'your_jwt_secret'
        },
        function (jwtPayload, cb) {
            return userBusiness.GetUserById(jwtPayload.id)
                .then(user => {
                    return cb(null, user);
                }, err => {
                    return cb(err);
                });
        }
    ));
    passport.use(new FacebookStrategy({
        clientID: '306378963857132',
        clientSecret: 'ac34e81b6a1f5a5d90aaf038699f5772',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'name', 'gender', 'photos']
      },
      function(accessToken, refreshToken, profile, cb) {
        console.log(`access token: ${accessToken}`);
        console.log(profile);
        return userBusiness.GetOrAddUserByFacebookProfile(profile)
                           .then(user => {
                              return cb(null, user);                           
                           }, err => {
                              return cb(err);
                           });

      }
    ));
};


