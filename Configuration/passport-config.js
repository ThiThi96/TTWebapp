let passportJWT = require("passport-jwt");
let ExtractJWT = passportJWT.ExtractJwt;
let LocalStrategy = require('passport-local').Strategy;
let JWTStrategy   = passportJWT.Strategy;
let userBusiness = require('../BLL').UserBusiness;
let bcrypt = require('bcrypt');

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
            console.log(jwtPayload);
            return userBusiness.GetUserById(jwtPayload.id)
                .then(user => {
                    return cb(null, user);
                }, err => {
                    return cb(err);
                });
        }
    ));
};


