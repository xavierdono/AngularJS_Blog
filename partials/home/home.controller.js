(function() {
'use strict';

    angular
        .module('night')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.inject = ['$scope'];
    
    function HomeCtrl($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();