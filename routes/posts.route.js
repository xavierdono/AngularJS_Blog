/*
Route	            HTTP Verb	    Description
/api/posts	        GET	            Get all the posts.
/api/posts	        POST	        Create a post.
/api/posts/:post_id GET	            Get a single post.
/api/posts/:post_id PUT	            Update a post with new info.
/api/posts/:post_id DELETE	        Delete a post.
*/
var express = require('express');
var Post = require('../models/Post');
var router = express.Router();

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

            // save the post
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
        }, function (err, post) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;