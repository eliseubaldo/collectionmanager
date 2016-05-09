(function(){
    'user strict';

    angular.module('collectionApp', ['ui.router', 'ngMaterial', 'ngFileUpload' ]);

    angular
        .module('collectionApp')
        .constant('config', {
            uploadpath: 'uploads/'
        });
    
})();


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
				var newcat = {};
				newcat.name = category.name;
				newcat.year = category.year;
				newcat.collection = category.collection.collection_id;
				//I created a newcat to select the appropriate collection Id 
				// coz the select is passing a model of category.collection as full object
				//It is like that coz I wanted to use the select to include and also get its 
				// value to show below on categories for that collection

				ioService.addCategory(newcat)
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
	.controller('addItemCtrl', addItemCtrl);

	addItemCtrl.$inject = ['$scope', 'ioService', 'Upload', '$timeout'];

	function addItemCtrl ($scope, ioService, Upload, $timeout){

		$scope.categoryList = [];
		$scope.collectionList = [];		

		getCollections();
		getCategory();

		$scope.submitForm = function(item){
			if($scope.itemForm.$valid){
				var newitem = {};
				newitem.name = item.name;
				newitem.desc = item.desc;
				//newitem.picture = item.picture;
				newitem.category = item.category.category_id;				
				// same problem here as the category view

				Upload.upload({
				      url: 'backend/include.php?type=item',
				      method: 'POST',
				      data:{file:$scope.item.picture, otherinfo:item}
				    })
					.then(function (resp) {
			            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			        }, function (resp) {
			            console.log('Error status: ' + resp.status);
			        }, function (evt) {
			            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			        });
			    	

				/* ioService.addItem(newitem)
				.then(function(response){
					$scope.itemForm.$setPristine();
					$scope.item = null;
					alert(response.data);					
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	}); */ 
			}

		};


		function getCategory(){
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
	.controller('browseCtrl', browseCtrl);

	browseCtrl.$inject = ['$scope', 'ioService', 'config'];

	function browseCtrl ($scope, ioService, config){

		$scope.categoryList = [];
		$scope.collectionList = [];
		$scope.itemList = [];
		$scope.uploadpath = config.uploadpath;		

		getCollections();
		getCategory();
		getItems();

		
		function getCategory(){
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

		function getItems(){
			ioService.updateList('item')
				.then(function(response){
					$scope.itemList = response.data;
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


(function(){
	'use strict';

angular
	.module('collectionApp')
	.factory('ioService', function($http){
	
	var factory = {};


	factory.addCollection = function(collection){
		console.log(collection);
		return $http.post('backend/include.php?type=col',collection);
	};

	factory.addCategory = function(category){
		console.log(category);
		return $http.post('backend/include.php?type=cat',category);
	};

	/*factory.addItem = function(item){
		console.log(item);
		return $http.post('backend/include.php?type=item',item);
	}; */

	factory.singleContact = function(id){
		
		return $http.get('backend/getcontact.php?id=' + id);
	
	};

	factory.updateList = function(type){
		switch (type) {
			case 'collection':
				return $http.get('backend/updatelist.php?type=col');
			break;
			case 'category':
				return $http.get('backend/updatelist.php?type=cat');
			break;
			case 'item':
				return $http.get('backend/updatelist.php?type=item');
			break;

		}
	};


	return factory;

});

})();