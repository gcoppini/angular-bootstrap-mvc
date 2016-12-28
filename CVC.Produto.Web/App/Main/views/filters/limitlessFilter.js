(function () {
    angular.module('app').filter('limitlessFilter', function ($filter) {
        return function (objects, limit, showAll) {
            if (showAll) {
                return objects;
            } else {
                return $filter('limitTo')(objects, limit);
            }
        }
    });
})();