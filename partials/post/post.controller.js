(function() {
'use strict';

    angular
        .module('night')
        .controller('PostCtrl', PostCtrl);

    PostCtrl.inject = ['$scope'];
    
    function PostCtrl($scope) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();