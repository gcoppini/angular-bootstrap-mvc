(function () {

    var controllerId = 'app.views.search';
    angular.module('app').controller(controllerId, [
        '$scope', '$state', 'appSession','app.services.github.search','$parse',
    function ($scope, $state, appSession, gitHubService,$parse) {
            var vm = this;

            vm.searchResults = [];
            vm.selectSortOption = [];
            vm.sortPredicate = null;
            vm.sortReverse = null;
            vm.filters = [];

            
            //q=tetris+language:assembly&sort=stars&order=desc
            vm.filters = {
                language: 'assembly',
                q: 'tetris',
                sort: 'stars',
                order: 'desc',
                textSearch: 'tetris'
            };

            vm.sortOptions = {
                "items": [
                { desc: "Best match", sort: "stars", order: "desc", predicate: '-stargazers_count', reverse: false },

                { desc: "Most Stars", sort: "stars", order: "desc", predicate: '-stargazers_count', reverse: false},
                { desc: "Fewest Stars", sort: "stars", order: "asc", predicate: '-stargazers_count', reverse: 'reverse'},

                
                { desc: "Most Forks", sort: "forks", order: "desc", predicate: '-forks_count', reverse: false},
                { desc: "Fewest Forks", sort: "forks", order: "asc", predicate: '-forks_count', reverse: 'reverse'},

                { desc: "Recentley Update", sort: "updated", order: "desc", predicate: '-updated_at', reverse: false },
                { desc: "Least Recentley Update", sort: "updated", order: "asc", predicate: '-updated_at', reverse: 'reverse'}
                ]
           };
            
            vm.UpdateSearchParam = function () {
                vm.filters.q = (vm.filters.language != null) ? vm.filters.textSearch + ':' + vm.filters.language : vm.filters.textSearch;
            }

            vm.loadEvents = function () {
                vm.UpdateSearchParam();
                console.log(vm.filters.q);
                gitHubService.getList(vm.filters).success(function (result) {
                    vm.searchResults = result;
                });
            };

            vm.SetLanguage = function (language) {
                vm.filters.language = language;
                vm.loadEvents();
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
        }
    ]);
})();