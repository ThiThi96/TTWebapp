module.exports = (passport) => {
  const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (user) {
        req.user = {
          name: `${user.FirstName} ${user.LastName}`,
          email: user.Email,
          id: user.UserId,
        };
      }
      next();
    })(req, res, next);
  };
  return {
    AuthByJwt: auth,
  };
};
