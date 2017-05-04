(function () {
    'use strict';

    angular
        .module('admin.users', ['admin.user'])
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.inject = ['User'];

    function UsersCtrl(User) {
        var vm = this;
        vm.message = '';
        vm.success = false;
        vm.error = false;
        vm.users = [];
        vm.editUser = {};
        vm.chargeUser = chargeUser;
        vm.manageUser = manageUser;
        vm.resetUser = resetUser;
        vm.deleteUser = deleteUser;

        activate();

        ////////////////

        function activate() {
            User.all().then(function (data) {
                vm.users = data.users;
            }).catch(function (data) {
                console.log('catch: ', data);
            });
        }

        function chargeUser(user) {
            vm.message = '';
            vm.success = false;
            vm.error = false;
            vm.editUser = user;
        }

        function resetUser(post) {
            vm.message = '';
            vm.success = false;
            vm.error = false;
            vm.editUser = {};
        }

        function deleteUser(user) {
            if (user._id) {
                User.del(user._id).then(function (data) {
                    vm.success = true;
                    vm.message = data.message;
                    vm.editUser = {};
                    activate();
                }).catch(function (data) {
                    vm.error = true;
                    vm.message = data;
                });
            }
        }

        function manageUser(user) {

            if (user._id) { // Update
                User.upd(user).then(function (data) {
                    vm.success = true;
                    vm.message = data.message;
                    vm.editUser = {};
                    activate();
                }).catch(function (data) {
                    vm.error = true;
                    vm.message = data;
                });
            } else { // Create

                if (user.username === undefined) {
                    return;
                }

                User.add(user).then(function (data) {
                    vm.success = true;
                    vm.message = data.message;
                    vm.editUser = {};
                    activate();
                }).catch(function (data) {
                    vm.error = true;
                    vm.message = data;
                });
            }
        }
    }
})();