(function () {
    'use strict';

    angular.module('night', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                // Home
                .when("/", { templateUrl: "partials/home/home.html", controller: "HomeCtrl" })
                // Pages
                .when("/about", { templateUrl: "partials/about/about.html", controller: "AboutCtrl" })
                .when("/contact", { templateUrl: "partials/contact/contact.html", controller: "ContactCtrl" })
                // Post
                .when("/post/:idPost", { templateUrl: "partials/post/post.html", controller: "PostCtrl" });
        }]);
})();