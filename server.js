// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var config = require('./config/config'); // config of mongodb
var Post = require('./models/Post');

// configuration =================
var db = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.db;
mongoose.connect(db);     // connect to mongoDB database

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

var router = express.Router();

/*

Route	            HTTP Verb	    Description
/                   *               Front-End
/api/posts	        GET	            Get all the posts.
/api/posts	        POST	        Create a post.
/api/posts/:post_id GET	            Get a single post.
/api/posts/:post_id PUT	            Update a post with new info.
/api/posts/:post_id DELETE	        Delete a post.

*/

// Route Front-End
app.get('/', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// on routes that end in /posts
// ----------------------------------------------------
router.route('/posts')

    // create a post (accessed at POST http://localhost:8080/api/posts)
    .post(function (req, res) {

        var post = new Post();      // create a new instance of the Post model
        post.title = req.body.title;
        post.desc = req.body.desc;
        post.body = req.body.body;
        post.user = req.body.user;
        post.date = req.body.date;

        // save the post and check for errors
        post.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Post created!' });
        });

    })

    // get all the posts (accessed at GET http://localhost:8080/api/posts)
    .get(function (req, res) {
        Post.find(function (err, posts) {
            if (err)
                res.send(err);

            res.json(posts);
        });
    });

// on routes that end in /posts/:post_id
// ----------------------------------------------------
router.route('/posts/:post_id')

    // get the post with that id (accessed at GET http://localhost:8080/api/posts/:post_id)
    .get(function (req, res) {
        Post.findById(req.params.post_id, function (err, post) {
            if (err)
                res.send(err);
            res.json(post);
        });
    })

    // update the post with this id (accessed at PUT http://localhost:8080/api/posts/:post_id)
    .put(function (req, res) {

        // use our post model to find the post we want
        Post.findById(req.params.post_id, function (err, post) {

            if (err)
                res.send(err);

            // update the post info
            post.title = req.body.title;
            post.desc = req.body.desc;
            post.body = req.body.body;
            post.user = req.body.user;
            post.date = req.body.date;

            // save the bear
            post.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Post updated!' });
            });

        });
    })

    // delete the post with this id (accessed at DELETE http://localhost:8080/api/posts/:post_id)
    .delete(function (req, res) {
        Post.remove({
            _id: req.params.post_id
        }, function (err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', router);


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");