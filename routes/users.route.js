/*
Route	            HTTP Verb	    Description
/api/users	        GET	            Get all the users.
/api/users	        POST	        Create a user.
/api/users/:user_id GET	            Get a single user.
/api/users/:user_id PUT	            Update a user with new info.
/api/users/:user_id DELETE	        Delete a user.
*/
var express = require('express');
var User = require('../models/User');
var router = express.Router();

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

    // create a User (accessed at User http://localhost:8080/api/users)
    .post(function (req, res) {

        var user = new User();      // create a new instance of the user model
        user.username = req.body.username;
        user.password = req.body.password;

        // save the User and check for errors
        user.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    })

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

    // get the User with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    // update the User with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function (req, res) {

        // use our User model to find the User we want
        User.findById(req.params.user_id, function (err, user) {

            if (err)
                res.send(err);

            // update the User info
            user.username = req.body.username;
            user.password = req.body.password;

            // save the user
            user.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })

    // delete the User with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;