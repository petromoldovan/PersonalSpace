angular.module('app.home', [
        'ui.router'
    ])

    .config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'homeCtrl',
                    templateUrl: 'app/home/home.tpl.html'
                }
            },
            data: {pageTitle: 'home'}
        })
    })

    .controller("homeCtrl", function contactCtrl($scope){
        //future code
    })