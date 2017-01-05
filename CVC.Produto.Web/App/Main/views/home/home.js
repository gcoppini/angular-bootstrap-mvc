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
        vm.searchPageSize = 10;


        vm.filters = {
            localRetirada: '',
            localDevolucao: '',
            devolverOutroLocal: '',
            dataRetirada: '',
            horaRetirada:'',
            dataDevolucao: '',
            horaDevolucao:'',
            incluirVoo: '',
            incluirHotel: ''
        };

        vm.sort = {

            PageSizeSelected: null,
            "PageSizeOptions": [
                { value: 10, desc: "10", },
                { value: 20, desc: "20", },
                { value: 30, desc: "30", },
                { value: 40, desc: "40", },
                { value: 50, desc: "50", }
            ],
            
            OrderBySelected: null,
            "OrderByOptions": [
                { desc: "Best match", sort: "stars", order: "desc", predicate: '-stargazers_count', reverse: false },

                { desc: "Most Stars", sort: "stars", order: "desc", predicate: '-stargazers_count', reverse: false },
                { desc: "Fewest Stars", sort: "stars", order: "asc", predicate: '-stargazers_count', reverse: 'reverse' },


                { desc: "Most Forks", sort: "forks", order: "desc", predicate: '-forks_count', reverse: false },
                { desc: "Fewest Forks", sort: "forks", order: "asc", predicate: '-forks_count', reverse: 'reverse' },

                { desc: "Recentley Update", sort: "updated", order: "desc", predicate: '-updated_at', reverse: false },
                { desc: "Least Recentley Update", sort: "updated", order: "asc", predicate: '-updated_at', reverse: 'reverse' }
            ],

            CurrencySelected:null,
            "CurrencyOptions": [
                { value: 10, desc: "Real" },
                { value: 20, desc: "Dólar" },
                { value: 30, desc: "Euro"  },
                { value: 40, desc: "Libra" },
                { value: 50, desc: "Iene" },
                { value: 60, desc: "Peso argentino" },
                { value: 70, desc: "Coroa Sueca" },
                { value: 80, desc: "Rublo russo" }
            ],

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


        $scope.$watch('vm.sort.OrderBy', function (newValue, oldValue) {
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
        
        
        vm.dataRetirada = {
            date: new Date().getDate(),
            datepickerOptions: {
                showWeeks: false,
                startingDay: 1,
                
                dateDisabled: function (data) {
                    return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
                }
            }
        };
                
        vm.horaRetirada = {
            date: new Date(),
            timepickerOptions: {
                readonlyInput: false,
                showMeridian: false
            }
        };
        
        vm.dataDevolucao = {
            date: new Date().getDate(),
            datepickerOptions: {
                showWeeks: false,
                startingDay: 1
            }
        };
                
        vm.horaDevolucao = {
            date: new Date(),
            timepickerOptions: {
                readonlyInput: false,
                showMeridian: false
            }
        };

        vm.openCalendar = function (e, picker) {
            vm[picker].open = true;
        };
        
        // destroy watchers
        $scope.$on('$destroy', function () {
            vm.searchResults = [];
        });
                
    }
    ]);
})();