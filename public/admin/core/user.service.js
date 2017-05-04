(function () {
    'use strict';

    angular
        .module('admin.user', [])
        .factory('User', User);

    User.inject = ['$http', '$q'];

    function User($http, $q) {

        var service = {
            all: allUsers,
            add: createUser,
            del: deleteUserById,
            upd: updateUser,
            id: getUserById
        };

        return service;

        ////////////////
        function allUsers() {
            var cmd = "/api/users";
            var deferred = $q.defer();

            $http.get(cmd).then(function (response) {
                deferred.resolve({
                    users: response.data
                });
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function getUserById(id_user) {
            var cmd = "/api/users/" + id_user;
            var deferred = $q.defer();

            $http.get(cmd).then(function (response) {
                deferred.resolve({
                    user: response.data
                });
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function createUser(user) {
            var cmd = "/api/users";
            var deferred = $q.defer();

            $http.post(cmd, user).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function updateUser(user) {
            var cmd = "/api/users/" + user._id;
            var deferred = $q.defer();

            $http.put(cmd, user).then(function (response) {
                deferred.resolve(response.data);
            }).catch(function (msg) {
                deferred.reject(msg);
            });

            return deferred.promise;
        }

        function deleteUserById(id_user) {
            var cmd = "/api/users/" + id_user;
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