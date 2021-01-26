const express = require('express');

const app = express();
const port = 3000;
const dotenv = require('dotenv');

dotenv.config();
const passport = require('passport');

require('./Configuration/middlewares')(app, express, passport);
require('./Configuration/passport-config')(passport);
require('./Configuration/routes')(app, passport);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
