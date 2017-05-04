(function () {
    'use strict';

    angular
        .module('admin.basicauth', [])
        .factory('BasicAuth', BasicAuth);

    function BasicAuth() {

        var connected = true;

        var service = {
            isConnected: isConnected,
            setConnection: setConnection
        };

        return service;

        function isConnected() {
            return connected;
        }

        function setConnection(connexion) {
            connected = connexion;
        }
    }
})();