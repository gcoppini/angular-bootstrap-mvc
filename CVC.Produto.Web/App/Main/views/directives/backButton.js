(function () {
    angular.module('app').directive('backButton', ['$window',
        function () {
            var link = function (window, scope) {
                scope.doBackHistory = function () {
                    window.history.back();
                };
            };

            return {
                link: link,
                template: "<button ng-click='doBackHistory()'>Voltar</button>"
            };

        }
]);
})();
         