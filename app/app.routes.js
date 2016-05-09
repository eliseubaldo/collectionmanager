(function(){
    'user strict';

    angular
        .module('collectionApp')
        .config(function ($stateProvider,$urlRouterProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider.state("home", {
                url: "/home",
                controller: "homeCtrl",
                templateUrl: "views/home.html"
            });

            $stateProvider.state("newcollection", {
                url: "/newcollection",
                controller: "newCollectionCtrl",
                templateUrl: "views/newcollection.html"
            });

            $stateProvider.state("addcategory", {
                url: "/addcategory",
                controller: "addCategoryCtrl",
                templateUrl: "views/addcategory.html"
            });

            $stateProvider.state("additem", {
                url: "/additem",
                controller: "addItemCtrl",
                templateUrl: "views/additem.html"
            });

            $stateProvider.state("browse", {
                url: "/browse",
                controller: "browseCtrl",
                templateUrl: "views/browsecollection.html"
            });
          
        });       
    
})();

