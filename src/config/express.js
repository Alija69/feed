const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../api/routes/index');
/**
 * Express instance
 * @public
 */
const app = express();


// parse body params and attache them to req.body
app.use(bodyParser.json());


// mount api v1 routes
app.use('/', routes);


module.exports = app;
