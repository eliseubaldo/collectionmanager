var app = angular.module('collectionApp', ['ui.router', 'ngMaterial']);

app.config(function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

	$stateProvider.state("home", {
        url: "/home",
        controller: "homeCtrl",
        templateUrl: "app/views/home.html"
    })

    $stateProvider.state("newcollection", {
        url: "/newcollection",
        controller: "newCollectionCtrl",
        templateUrl: "app/views/newcollection.html"
    })
  
});