var app = angular.module("bestApp",[
        'app.snake',
        'app.planner',
        'app.home',
        'ui.router',
        'ui.bootstrap',
        'services.crud',
        'ngAnimate'
      ])


    .config(function appConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })

    .run(function ($state, $rootScope) {
        $rootScope.$state = $state;         //define state for ng-if
    })

    .controller('AppCtrl', function AppCtrl() {
        //future code
    });
