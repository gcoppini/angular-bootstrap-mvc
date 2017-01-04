(function () {

    var controllerId = 'app.views.home';
    angular.module('app').controller(controllerId, [
        '$scope', '$state', 'appSession', 'app.services.cvc.rentacar.search', '$parse',
    function ($scope, $state, appSession, rentacarSearch, $parse) {
        var vm = this;

        vm.searchResults = [];
        vm.selectSortOption = [];
        vm.sortPredicate = null;
        vm.sortReverse = null;
        vm.filters = [];


        vm.filters = {
            localRetirada: '',
            localDevolucao: '',
            devolverOutroLocal: '',
            dataRetirada: '',
            dataDevolucao: '',
            incluirVoo: '',
            incluirHotel: ''
        };

        vm.sortOptions = {
            "items": [
            { desc: "Best match", sort: "stars", order: "desc", predicate: '-stargazers_count', reverse: false },

            { desc: "Most Stars", sort: "stars", order: "desc", predicate: '-stargazers_count', reverse: false },
            { desc: "Fewest Stars", sort: "stars", order: "asc", predicate: '-stargazers_count', reverse: 'reverse' },


            { desc: "Most Forks", sort: "forks", order: "desc", predicate: '-forks_count', reverse: false },
            { desc: "Fewest Forks", sort: "forks", order: "asc", predicate: '-forks_count', reverse: 'reverse' },

            { desc: "Recentley Update", sort: "updated", order: "desc", predicate: '-updated_at', reverse: false },
            { desc: "Least Recentley Update", sort: "updated", order: "asc", predicate: '-updated_at', reverse: 'reverse' }
            ]
        };

        vm.UpdateSearchParam = function () {
            vm.filters.q = (vm.filters.language != null) ? vm.filters.textSearch + ':' + vm.filters.language : vm.filters.textSearch;
        }

        vm.Search = function () {
            vm.UpdateSearchParam();
            console.log(vm.filters);
            rentacarSearch.search(vm.filters).then(function (result) {
                vm.searchResults = result.data;
            });
        };

        vm.SetLanguage = function (language) {
            vm.filters.language = language;
            vm.Search();
        };

        $scope.toggleShowAll = function () {
            $scope.showAll = !$scope.showAll;
        };


        $scope.$watch('vm.filters.selectSortOption', function (newValue, oldValue) {
            if (newValue != oldValue) {
                console.log(oldValue + ' - ' + newValue);

                var nv = JSON.parse(newValue);

                //Ordenação parametros busca API
                vm.filters.sort = nv.sort;
                vm.filters.order = nv.order;

                //Ordenção resultados em cache
                vm.sortPredicate = nv.predicate;
                vm.sortReverse = nv.reverse;
            }
        });


        //Datas
        $scope.$watch("date", function (date) {
            // read date value
        }, true);

        
    }
    ]);
})();