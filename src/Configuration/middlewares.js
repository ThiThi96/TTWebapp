const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers');
const auth = require('./auth');

const math = helpers.math();
const customHelpers = require('./view-helpers');

const hbs = exphbs.create({
  extname: '.hbs',
  helpers: {
    ...customHelpers,
    ...math,
  },
  handlebars: allowInsecurePrototypeAccess(handlebars),
});

module.exports = (app, express, passport) => {
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('views', 'src/views');

  app.use(express.static('src/public'));
  app.use('/components', express.static('node_modules'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(auth(passport).AuthByJwt);
};
