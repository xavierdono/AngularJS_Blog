(function () {
    'use strict';

    angular
        .module('night.post', [])
        .factory('Post', Post);

    Post.inject = ['$firebaseArray', '$firebaseObject'];

    function Post($firebaseArray, $firebaseObject) {
        var ref = firebase.database().ref('posts');

        var service = {
            all: allPosts,
            id: postById
        };

        return service;

        ////////////////
        function allPosts() {
            return $firebaseArray(ref);
        }

        function postById(id) {
            return $firebaseObject(ref.child(id));
        }

        function createPost(post) {
            return ref.$add(post);
        }

        function deletePost(post) {
            return ref.$remove(post);
        }
    }
})();