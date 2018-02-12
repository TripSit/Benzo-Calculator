var express = require("express"),
    bodyParser = require("body-parser"),
    routes = require('./routes/index'),
    app = express(),
    _ = require('underscore')._,
    request = require('request'),
    path = require('path');
    

    
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));    
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.use('/', routes);


module.exports = app;



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Benzodiazepine Calculator Server has Started!");
});