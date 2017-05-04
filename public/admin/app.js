(function () {
    'use strict';

    angular.module('admin',
        [
            'ngRoute',

            'admin.auth',
            'admin.basicauth',
            'admin.posts'
        ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                // Auth
                .when("/", {
                    templateUrl: "auth/auth.html", controller: "AuthCtrl as auth", resolve:
                    {
                        mess: function ($location, BasicAuth) {
                            if (BasicAuth.isConnected() === true) {
                                $location.path('/bienvenue');
                            }
                        }
                    }
                })
                // Bienvenue
                .when("/bienvenue", {
                    templateUrl: "bienvenue/bienvenue.html", resolve:
                        {
                            mess: function ($location, BasicAuth) {
                                if (BasicAuth.isConnected() === false) {
                                    $location.path('/');
                                }
                            }
                        }
                })
                // Posts
                .when("/posts", {
                    templateUrl: "posts/posts.html", controller: "PostsCtrl as posts", resolve:
                        {
                            mess: function ($location, BasicAuth) {
                                if (BasicAuth.isConnected() === false) {
                                    $location.path('/');
                                }
                            }
                        }
                })
            // Users
            //.when("/users", { templateUrl: "users/users.html", controller: "UsersCtrl as users" })
            // Déconnexion
            //.when("/deconnexion", { templateUrl: "deconnexion/deconnexion.html", controller: "DeconnexionCtrl as deco" });
        }]);
})();