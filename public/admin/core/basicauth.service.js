(function () {
    'use strict';

    angular
        .module('admin.basicauth', [])
        .factory('BasicAuth', BasicAuth);

    function BasicAuth() {

        var auth = true;

        var service = {
            isConnected: isConnected,
            setConnection: setConnection
        };

        return service;

        function isConnected() {
            return auth;
        }

        function setConnection(authentified) {
            auth = authentified;
        }
    }
})();