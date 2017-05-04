(function () {
    'use strict';

    angular
        .module('admin.auth', [])
        .controller('AuthCtrl', AuthCtrl);

    AuthCtrl.inject = ['$location', 'BasicAuth'];

    function AuthCtrl($location, BasicAuth) {
        var vm = this;
        vm.user = {};
        vm.error = false;
        vm.message = '';
        vm.login = login;

        ////////////////

        function login(user) {
            BasicAuth.setConnection(true);
            $location.path('/bienvenue');
        }
    }
})();