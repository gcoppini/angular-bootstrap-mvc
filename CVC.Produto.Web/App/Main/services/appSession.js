(function () {
    angular.module('app').factory('appSession', [
            function () {
                var _session = {
                    usuario: null,
                    EndPointCvcRentACarSearchMock: 'App/Main/services/searchResultsMock.json',
                    EndPointSearch: 'https://api.github.com/search/repositories',
                    EndPointRepositories: 'https://api.github.com/repositories'
                };
                                
                return _session;
            }
        ]);
})();