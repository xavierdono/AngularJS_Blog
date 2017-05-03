// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var config = require('./config/config.js'); // simulate DELETE and PUT (express4)

// configuration =================
var db = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.db;
mongoose.connect(db);     // connect to mongoDB database

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Model
var Post = mongoose.model('Post', {
    title: String,
    desc: String,
    body: String,
    user: String,
    date: String
});

// Routes API
app.get('/api/posts/:id', function (req, res) {

    // use mongoose to get the post in the database
    Post.findById(req.params.id, function (err, post) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(post); // return the post in JSON format
    });
});

app.get('/api/posts', function (req, res) {

    // use mongoose to get all posts in the database
    Post.find(function (err, posts) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(posts); // return all posts in JSON format
    });
});

app.post('/api/posts', function (req, res) {

    // create a post, information comes from AJAX request from Angular
    Post.create({
        title: req.body.title,
        desc: req.body.desc,
        body: req.body.body,
        user: req.body.user,
        date: req.body.date
    }, function (err, todo) {
        if (err) {
            res.send(err);
        }

        // get and return all the posts after you create another
        Post.find(function (err, posts) {
            if (err) {
                res.send(err);
            }

            res.json(posts);
        });
    });

});

// Route Front-End
app.get('', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");