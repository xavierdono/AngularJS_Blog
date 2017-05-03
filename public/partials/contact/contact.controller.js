(function() {
'use strict';

    angular
        .module('night')
        .controller('ContactCtrl', ContactCtrl);

    ContactCtrl.inject = ['$scope'];

    function ContactCtrl($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();