(function () {

    var controllerId = 'app.views.home';
    angular.module('app').controller(controllerId, [
        '$scope', '$state', 'appSession', 'app.services.cvc.rentacar.search', '$parse','$log',
    function ($scope, $state, appSession, rentacarSearch, $parse, $log) {
        var vm = this;
        
        vm.filters = [];
        vm.sort = [];

        vm.sortPredicate = null;
        vm.sortReverse = null;
        
        vm.searchResults = [];
        vm.pagedSearchResults = []
                
        


        vm.totalItems = 0;
        vm.currentPage = 0;
        vm.numPerPage = 3;
        vm.maxSize = 3;
        

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
                { value: 3, desc: "3", },
                { value: 5, desc: "5", },
                { value: 10, desc: "10", },
                { value: 15, desc: "15", },
                { value: 20, desc: "20", }
            ],
            
            OrderBySelected: null,
            "OrderByOptions": [
                { desc: "Maior preço", sort: "stars", order: "desc", predicate: '-ValorLocacaoPor', reverse: false },
                { desc: "Menor preço", sort: "stars", order: "desc", predicate: '-ValorLocacaoPor', reverse: true },

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

                
        vm.Search = function () {
            
            console.log(vm.filters);

            rentacarSearch.search(vm.filters).then(function (result) {
                vm.searchResults = result.data;
                vm.setPage(1);
            });
            
        };

        

        vm.toggleShowAll = function () {
            $scope.showAll = !$scope.showAll;
        };
               



        vm.setPage = function (pageNo) {
            vm.currentPage = pageNo;
        };

        vm.pageChanged = function () {
            $log.log('Page changed to: ' + vm.currentPage);
        };


        vm.PageSizeSelectedChanged = function () {
            vm.numPerPage = vm.sort.PageSizeSelected;
        }


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
         
        $scope.$watch('vm.searchResults', function () {

            if (!vm.searchResults || !vm.searchResults.items) return;

            vm.totalItems = vm.searchResults.items.length;
            
        });
        
        $scope.$watch('vm.currentPage + vm.numPerPage + vm.totalItems', function () {

            console.log(vm.currentPage + ' - ' + vm.numPerPage + ' - ' + vm.totalItems);
            if (!vm.searchResults || !vm.searchResults.items) return;
            
            var begin = ((vm.currentPage - 1) * vm.numPerPage), end = begin + vm.numPerPage;
            vm.pagedSearchResults = vm.searchResults.items.slice(begin, end);
            
        });


        
        vm.dataRetirada = {
            date: new Date(),
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
            date: new Date(),
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