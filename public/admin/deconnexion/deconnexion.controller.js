(function () {
    'use strict';

    angular
        .module('admin.deconnexion', ['admin.basicauth'])
        .controller('DeconnexionCtrl', DeconnexionCtrl);

    DeconnexionCtrl.inject = ['$location', 'BasicAuth'];

    function DeconnexionCtrl($location, BasicAuth) {
        var vm = this;


        activate();

        ////////////////

        function activate() { 
            BasicAuth.setConnection(false);
            $location.path('/');
        }
    }
})();