let express = require('express');
let app = express();
let port = 3000;
let dotenv = require('dotenv');
dotenv.config();
let db = require("./DAL/Models");
let passport = require('passport');
let helpers = require('handlebars-helpers');
let math = helpers.math();
let customHelpers = require('./Configuration/view-helpers');

require('./Configuration/middlewares')(app, express, passport);
require('./Configuration/passport-config')(passport);
require('./Configuration/routes')(app, passport);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));