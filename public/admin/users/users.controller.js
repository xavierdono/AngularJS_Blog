(function () {
    'use strict';

    angular
        .module('admin.users', [])
        .controller('UsersCtrl', UsersCtrl);

    //UsersCtrl.inject = ['dependency1'];

    function UsersCtrl() {
        var vm = this;


        activate();

        ////////////////

        function activate() { }
    }
})();