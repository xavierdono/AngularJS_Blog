(function() {
'use strict';

    angular
        .module('admin.auth', [])
        .controller('AuthCtrl', AuthCtrl);

    //AuthCtrl.inject = ['dependency1'];

    function AuthCtrl() {
        var vm = this;
        
        activate();

        ////////////////

        function activate() { }
    }
})();