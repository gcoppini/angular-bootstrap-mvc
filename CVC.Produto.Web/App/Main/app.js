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

        'CVC'
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
    
    //Constant for date & time picker
    app.constant('uiDatetimePickerConfig', {
        dateFormat: 'yyyy-MM-dd HH:mm',
        defaultTime: '00:00:00',
        html5Types: {
            date: 'yyyy-MM-dd',
            'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
            'month': 'yyyy-MM'
        },
        initialPicker: 'date',
        reOpenDefault: false,
        enableDate: true,
        enableTime: true,
        buttonBar: {
            show: true,
            now: {
                show: true,
                text: 'Agora'
            },
            today: {
                show: true,
                text: 'Hoje'
            },
            clear: {
                show: true,
                text: 'Limpar'
            },
            date: {
                show: true,
                text: 'Data'
            },
            time: {
                show: true,
                text: 'Tempo'
            },
            close: {
                show: true,
                text: 'Fechar'
            }
        },
        closeOnDateSelection: true,
        closeOnTimeNow: true,
        appendToBody: false,
        altInputFormats: [],
        ngModelOptions: {},
        saveAs: false,
        readAs: false,
    });

})();