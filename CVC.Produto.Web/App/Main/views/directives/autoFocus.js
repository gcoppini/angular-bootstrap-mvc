(function () {
    angular.module('app').directive('autoFocus', function () {
          return {
              restrict: 'A',
              link: function (scope, element) {
                  $timeout(function () {
                      element[0].focus();
                  }, 300);
              }
          };
      });
})();