(function () {
    'use strict';
    
    var app = angular.module('app', [
        'ngAnimate',
        'ngSanitize',
        'ngAria',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        'ui.router',
        'ui.utils',

        'ViajaNet'
    ]);

    //Configuration for Angular UI routing.
    app.config([
        '$stateProvider', '$urlRouterProvider', '$qProvider',
        function ($stateProvider, $urlRouterProvider, $qProvider) {

            $qProvider.errorOnUnhandledRejections(false); //bugFix

            $urlRouterProvider.otherwise('/');
            
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/App/Main/views/home/home.cshtml',
                    menu: 'Home'
                })
                .state('search', {
                    url: '/search',
                    templateUrl: '/App/Main/views/search/search.cshtml',
                    menu: 'Search'
                })
                .state('details', {
                    url: '/search/:id',
                    templateUrl: '/App/Main/views/search/details.cshtml',
                    menu: 'Search'
                })
                .state('about', {
                    url: '/about',
                    templateUrl: '/App/Main/views/about/about.cshtml',
                    menu: 'About'
                });
        }
    ]);

})();