'use strict';

angular.module('RbNetflixApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'scrollable',
    'angular-ladda'
])
        .config(function($routeProvider, $locationProvider, $interpolateProvider, laddaProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html'
                    })
                    .when('/:repository', {
                        templateUrl: 'views/repository.html',
                        controller: 'NetflixRepositoryCtrl'
                    }
                    )
                    .otherwise({
                        redirectTo: '/'
                    });

            /*
             Somente ativo caso o servidor tenha permissão de escrita de rotas
             if(window.history && window.history.pushState){
             $locationProvider.html5Mode({
             enabled: true,
             requireBase: false
             });
             }
             */

            laddaProvider.setOption({
                style: 'expand-left'
            });
        });