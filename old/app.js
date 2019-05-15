var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    app = express(),
    _ = require('underscore')._,
    request = require('request'),
    path = require('path');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/', routes);

module.exports = app;
var port  = 4000;
app.listen(port, function () {
    console.log('Benzodiazepine Calculator Server has Started on port: ' + port);
  });
