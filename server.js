// set up ========================
var env = require('dotenv');
var express  = require('express');
var app      = express();   
const bodyParser = require('body-parser');

// Express Setup and REST endpoints
app.use(bodyParser.json());
// configuration =================
app.use(express.static(__dirname + '/app'));

app.get('*', function(req, res) { 
  res.sendFile(__dirname + '/app/index.html')
});

// listen (start app with node server.js) ======================================

var port = 8082;
app.listen(port);
console.log("App listening on port "+port);