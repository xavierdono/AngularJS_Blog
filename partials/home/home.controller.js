(function () {
    'use strict';

    angular
        .module('night')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.inject = ['$scope', 'Post'];

    function HomeCtrl($scope, Post) {
        var vm = this;


        activate();

        ////////////////

        function activate() {
            $scope.posts = Post.all();
        }
    }
})();