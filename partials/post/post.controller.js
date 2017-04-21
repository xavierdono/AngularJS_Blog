(function() {
'use strict';

    angular
        .module('night')
        .controller('PostCtrl', PostCtrl);

    PostCtrl.inject = ['$scope', '$routeParams', 'Post'];
    
    function PostCtrl($scope, $routeParams, Post) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() {
            $scope.post = Post.id($routeParams.idPost);
        }
    }
})();