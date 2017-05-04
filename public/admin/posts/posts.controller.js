(function () {
    'use strict';

    angular
        .module('admin.posts', ['night.post'])
        .controller('PostsCtrl', PostsCtrl);

    PostsCtrl.inject = ['Post'];

    function PostsCtrl(Post) {
        var vm = this;
        vm.success = false;
        vm.error = false;
        vm.posts = [];
        vm.editPost = {};
        vm.chargePost = chargePost;
        vm.managePost = managePost;
        vm.resetPost = resetPost;
        vm.deletePost = deletePost;

        activate();

        ////////////////

        function activate() {
            Post.all().then(function (data) {
                vm.posts = data.posts;
            }).catch(function (data) {
                console.log('catch: ', data);
            });
        }

        function chargePost(post) {
            vm.success = false;
            vm.error = false;
            vm.editPost = post;
        }

        function resetPost(post) {
            vm.success = false;
            vm.error = false;
            vm.editPost = {};
        }

        function deletePost(post) {
            
        }

        function managePost(post) {
            if (post._id) { // Update
                vm.success = true;
            } else { // Create

                if(post.title === undefined) {
                    return;
                }

                var mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
                var date = new Date();

                post.user = 'Anonymous';
                post.date = date.getDate() + ' ' + mois[date.getMonth()] + ' à ' + date.getHours() + 'H' + date.getMinutes();

                Post.add(post).then(function (data) {
                    vm.success = true;

                    activate();
                }).catch(function (data) {
                    vm.error = true;
                    console.log('catch: ', data);
                });
            }

            vm.editPost = {};
        }
    }
})();