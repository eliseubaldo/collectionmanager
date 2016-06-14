(function(){
    'user strict';

    angular
        .module('collectionApp')
        .config(function ($stateProvider,$urlRouterProvider, $httpProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider
            .state("home", {
                url: "/home",
                controller: "homeCtrl",
                templateUrl: "views/home.html"
            })

            .state("newcollection", {
                url: "/newcollection",
                controller: "newCollectionCtrl",
                templateUrl: "views/newcollection.html"
            })

            .state("addcategory", {
                url: "/addcategory",
                controller: "addCategoryCtrl",
                templateUrl: "views/addcategory.html"
            })

            .state("additem", {
                url: "/additem",
                controller: "addItemCtrl",
                templateUrl: "views/additem.html"
            })

            .state("viewitem", {
                url: "/viewitem/:itemid",
                controller: "itemCtrl",
                templateUrl: "views/viewitem.html"
            })

            .state("browse", {
                url: "/browse/:collection_id",
                controller: "browseCtrl",
                templateUrl: "views/browsecollection.html"
            });

            // Loader Interceptor
            $httpProvider.interceptors.push('LoadingInterceptor');
          
        });       
    
})();

