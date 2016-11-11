var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Mongoose connect
mongoose.connect('mongodb://localhost/invocr');
var db = mongoose.connection;

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(3000);
console.log('Server starts 3000');