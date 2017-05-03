(function () {
    'use strict';

    angular.module('night',
        [
            'ngRoute',

            'night.post'
        ])

        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                // Home
                .when("/", { templateUrl: "partials/home/home.html", controller: "HomeCtrl as home" })
                // Pages
                .when("/about", { templateUrl: "partials/about/about.html", controller: "AboutCtrl as about" })
                .when("/contact", { templateUrl: "partials/contact/contact.html", controller: "ContactCtrl as contact" })
                // Post
                .when("/post/:idPost", { templateUrl: "partials/post/post.html", controller: "PostCtrl as post" });
        }]);
})();