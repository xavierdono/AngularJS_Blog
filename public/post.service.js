(function() {
'use strict';

    angular
        .module('night.post', [])
        .factory('Post', Post);

    Post.inject = ['$http', '$q'];

    function Post($http, $q) {
        
        var service = {
            all: allPosts,
            add: createPost,
            del: deletePostById,
            upd: updatePost,
            id: getPostById
        };

        return service;

        ////////////////
        function allPosts() { 
            var cmd = "/api/posts";
            var deferred = $q.defer();

            $http.get(cmd).then(function (response) {
                deferred.resolve({
                    posts: response.data
                });
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function getPostById(id_post) { 
            var cmd = "/api/posts/" + id_post;
            var deferred = $q.defer();

            $http.get(cmd).then(function (response) {
                deferred.resolve({
                    post: response.data
                });
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function createPost(post) { 
            var cmd = "/api/posts";
            var deferred = $q.defer();

            $http.post(cmd, post).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function updatePost(post) { 
            var cmd = "/api/posts/" + post._id;
            var deferred = $q.defer();

            $http.put(cmd, post).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function deletePostById(id_post) { 
            var cmd = "/api/posts/" + id_post;
            var deferred = $q.defer();

            $http.delete(cmd).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }
    }
})();