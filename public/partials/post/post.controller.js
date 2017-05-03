(function () {
    'use strict';

    angular
        .module('night')
        .controller('PostCtrl', PostCtrl);

    PostCtrl.inject = ['$routeParams', 'Post'];

    function PostCtrl($routeParams, Post) {
        var vm = this;
        vm.post = {};

        activate();

        ////////////////

        function activate() {
            Post.id($routeParams.idPost).then(function (data) {
                vm.post = data.post;
            }).catch(function (data) {
                console.log('catch: ', data);
            });
        }
    }
})();