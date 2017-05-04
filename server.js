// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var config = require('./config/config'); // config of mongodb
var routePost = require('./routes/posts.route.js');

// configuration =================
var db = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.db;
mongoose.connect(db);     // connect to mongoDB database

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Route Front-End
app.get('/', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// Route Post
app.use('/api', routePost);

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");