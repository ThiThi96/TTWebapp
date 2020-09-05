let express = require('express');
let app = express();
const PORT = 3000;

let dotenv = require('dotenv');
dotenv.config();
let passport = require('passport');


require('./Configuration/middlewares')(app, express, passport);
require('./Configuration/passport-config')(passport);
require('./Configuration/routes')(app, passport);

app.listen(port, () => console.log(`Example app listening on port ${PORT}!`));