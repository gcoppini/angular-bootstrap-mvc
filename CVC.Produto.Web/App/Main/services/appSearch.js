(function () {

    var viajaNetModule = angular.module('app');

    viajaNetModule.factory('app.services.cvc.rentacar.search', [
        '$http', 'appSession', function ($http, appSession) {
            return new function () {
                
                this.search = function (httpParams) {

                    return $http({
                        url: appSession.EndPointCvcRentACarSearchMock,
                        method: "GET",
                        params: httpParams 
                    });
                };

                this.getRepo = function (id) {
                    return $http({
                        url: appSession.EndPointRepositories +'/'+ id,
                        method: "GET"
                    });
                };
            };
        }
    ]);

})();