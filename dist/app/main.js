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
          
        });
    
})();


(function(){
	'use strict';

angular
	.module('collectionApp')
	.factory('ioService', function($http){
	
	var factory = {};


	factory.addCollection = function(collection){
		console.log(collection);
		return $http.post('/backend/include.php?type=col',collection);
	};

	factory.singleContact = function(id){
		
		return $http.get('/backend/getcontact.php?id=' + id);
	
	};

	factory.updateList = function(type){
		switch (type) {
			case 'collection':
				return $http.get('/backend/updatelist.php?type=col');
			break;
			case 'category':
				return $http.get('/backend/updatelist.php?type=cat');
			break;

		}
	};


	return factory;

});

})();
(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('addCategoryCtrl', addCategoryCtrl);

	addCategoryCtrl.$inject = ['$scope', 'ioService'];

	function addCategoryCtrl ($scope, ioService){

		$scope.categoryList = [];

		$scope.collectionList = [];

		getCollections();

		updateCategory();

		$scope.submitForm = function(category){
			if($scope.categoryForm.$valid){
				console.log(category);

				ioService.addCategory(category)
				.then(function(response){
					$scope.categoryForm.$setPristine();
					$scope.category = null;
					alert(response.data);
					updateCategory();
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	}); 
			}

		};

		function updateCategory(){
			ioService.updateList('category')
				.then(function(response){
					$scope.categoryList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}

		function getCollections(){
			ioService.updateList('collection')
				.then(function(response){
					$scope.collectionList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}




	}


})();	


(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$scope'];

	function homeCtrl ($scope){

		

	}

})();	


(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('newCollectionCtrl', newCollectionCtrl);

	newCollectionCtrl.$inject = ['$scope', 'ioService'];

	function newCollectionCtrl ($scope, ioService){

		$scope.collectionList = [];

		updateCollection();

		$scope.submitForm = function(collection){
			if($scope.collectionForm.$valid){
				console.log(collection);

				ioService.addCollection(collection)
				.then(function(response){
					$scope.collectionForm.$setPristine();
					$scope.collection = null;
					alert(response.data);
					updateCollection();
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	}); 
			}

		};

		function updateCollection(){
			ioService.updateList('collection')
				.then(function(response){
					$scope.collectionList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}

		




	}


})();	

