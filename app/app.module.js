(function(){
    'user strict';

    angular.module('collectionApp', ['ui.router', 'ngMaterial']);

    angular
        .module('collectionApp')
        .config(function ($stateProvider,$urlRouterProvider) {

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

            $stateProvider.state("addcategory", {
                url: "/addcategory",
                controller: "addCategoryCtrl",
                templateUrl: "app/views/addcategory.html"
            })

            $stateProvider.state("additem", {
                url: "/additem",
                controller: "addItemCtrl",
                templateUrl: "app/views/additem.html"
            })
          
        });
    
})();

