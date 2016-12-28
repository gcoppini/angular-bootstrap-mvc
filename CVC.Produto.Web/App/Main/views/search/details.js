(function () {

    var controllerId = 'app.views.details';
    angular.module('app').controller(controllerId, [
        '$scope', '$state', '$stateParams', 'appSession','app.services.github.search','$parse',
    function ($scope, $state, $stateParams, appSession, gitHubService,$parse) {
        var vm = this;

        vm.repository = null;


        function loadEvent() {
            gitHubService.getRepo($stateParams.id).success(function (result) {
                vm.repository = result;
            });
        }


        loadEvent();
  

           
        }
    ]);
})();