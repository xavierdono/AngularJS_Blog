(function () {
    'use strict';

    angular
        .module('night')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.inject = ['Post'];

    function HomeCtrl(Post) {
        var vm = this;
        vm.create = create;
        vm.posts = [];

        activate();

        ////////////////

        function activate() {
            Post.all().then(function (data) {
                vm.posts = data.posts;
            }).catch(function (data) {
                console.log('catch: ', data);
            });
        }

        function create() {
            var post = {
                title: 'req.body.title',
                desc: 'req.body.desc',
                body: 'req.body.body',
                user: 'req.body.user',
                date: 'req.body.date'
            };

            Post.add(post).then(function (data) {
                console.log(data);
            }).catch(function (data) {
                console.log('catch: ', data);
            });
        }
    }
})();