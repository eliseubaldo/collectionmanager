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

	addCategoryCtrl.$inject = ['$scope', 'ioService', '$mdToast', '$animate'];

	function addCategoryCtrl ($scope, ioService, $mdToast, $animate){

		$scope.categoryList = [];
		$scope.collectionList = [];
		$scope.currCollection = {};

		$scope.toastPosition = {
                bottom: true,
                top: false,
                left: false,
                right: true
        };

		getCollections();

		updateCategory();

        $scope.getToastPosition = function() {
                return Object.keys($scope.toastPosition)
                    .filter(function(pos) { return $scope.toastPosition[pos]; })
                    .join(' ');
        };

        $scope.setCollection = function(collection){
			var str = JSON.parse(collection);
			$scope.currCollection = str;
		}



		$scope.submitForm = function(category){
			category.collection = $scope.currCollection.collection_id;			
			
			if($scope.categoryForm.$valid){
				
				ioService.addCategory(category)
				.then(function(response){
					$mdToast.show( $mdToast.simple().content('Category '+ category.name + ' added !').position($scope.getToastPosition()).hideDelay(3000) );
					$scope.categoryForm.$setPristine();
					$scope.category = null;					
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

	addItemCtrl.$inject = ['$scope', 'ioService', 'Upload', '$timeout','$mdToast', '$animate'];

	function addItemCtrl ($scope, ioService, Upload, $timeout, $mdToast, $animate){

		$scope.categoryList = [];
		$scope.collectionList = [];
		$scope.currCollection = {};

		//Upload button material style
		var input = document.getElementById("fileInput");
		var button = document.getElementById("uploadButton");	   
	    button.addEventListener("click", function(){
	    	input.click();
	  	});

		$scope.toastPosition = {
                bottom: false,
                top: true,
                left: false,
                right: true
        };		

		getCollections();
		getCategory();

		$scope.setCollection = function(collection){
			var str = JSON.parse(collection);
			$scope.currCollection = str;
		}


		$scope.getToastPosition = function() {
                return Object.keys($scope.toastPosition)
                    .filter(function(pos) { return $scope.toastPosition[pos]; })
                    .join(' ');
        };

		$scope.submitForm = function(item){
			var collname = $scope.currCollection.collection_name;	
			var collid = $scope.currCollection.collection_id;	
			

			console.log("collname:"+collname + " id:"+ collid );
			
			
			if($scope.itemForm.$valid){				
				Upload.upload({
				      url: 'backend/include.php?type=item',
				      method: 'POST',
				      data:{file:$scope.item.picture, otherinfo:item, collName:collname, collId:collid}
				    })
					.then(function (resp) {
						$mdToast.show( $mdToast.simple().content('Item '+ item.name + ' added !').position($scope.getToastPosition()).hideDelay(3000) );
						$scope.itemForm.$setPristine();
						$scope.item = null;
								
			            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			        }, function (resp) {
			            console.log('Error status: ' + resp.status);
			        }, function (evt) {
			            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			        });			    	

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
		$scope.currentCategory = {};
		$scope.currCollection = {};
		$scope.uploadpath = config.uploadpath;		
		

		getCollections();
		getCategory();
		getItems();

		$scope.setCollection = function(collection){
			var str = JSON.parse(collection);
			$scope.currCollection = str;
		}

		$scope.setCategory = function(category){
			var str = JSON.parse(category);
			$scope.currentCategory = str;
			
		}

		
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

	newCollectionCtrl.$inject = ['$scope', 'ioService', '$mdToast', '$animate'];

	function newCollectionCtrl ($scope, ioService, $mdToast, $animate){

		$scope.collectionList = [];

		updateCollection();

		$scope.toastPosition = {
                bottom: false,
                top: true,
                left: false,
                right: true
        };

        $scope.getToastPosition = function() {
                return Object.keys($scope.toastPosition)
                    .filter(function(pos) { return $scope.toastPosition[pos]; })
                    .join(' ');
        };


		$scope.submitForm = function(collection){
			if($scope.collectionForm.$valid){
				
				ioService.addCollection(collection)
				.then(function(response){
					$mdToast.show( $mdToast.simple().content('Collection '+ collection.name + ' added !').position($scope.getToastPosition()).hideDelay(3000) );
					$scope.collectionForm.$setPristine();
					$scope.collection = '';					
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
	.controller('itemCtrl', itemCtrl);

	itemCtrl.$inject = ['$scope', 'ioService', 'config', '$stateParams', '$q'];

	function itemCtrl ($scope, ioService, config, $stateParams, $q){

		console.log('Params: '+ $stateParams.itemid);

		$scope.category = [];
		$scope.collection = [];
		$scope.item = [];
		$scope.uploadpath = config.uploadpath;
		getItem($stateParams.itemid);

	
		function getItem(id){
			ioService.updateList('item', id)
				.then(function(item)
				{
					$scope.item = item.data;
					getCollection($scope.item[0].collection_id);
												
				});
		}

		function getCollection(collectionid){
					
			ioService.updateList('collection',collectionid)
				.then(function(collection)
				{
					$scope.collection = collection.data;
					$scope.item[0].collection_name = $scope.collection[0].collection_name;
					getCategory($scope.item[0].category_id);
				});
		}

		function getCategory(categoryid){

				ioService.updateList('category', categoryid)
					.then(function(category)
					{
						$scope.category = category.data;
						$scope.item[0].category_name = $scope.category[0].category_name;
					});
		};

			


	}


})();	


(function(){
	'use strict';

angular
	.module('collectionApp')
	.factory('ioService', function($http){
	
	var factory = {};


	factory.addCollection = function(collection){
		
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


	factory.updateList = function(type, id){
		switch (type) {
			case 'collection':
				if(id){
					console.log('return collection :'+id);
					return $http.get('backend/updatelist.php?type=col&id='+id);
				}else{
					return $http.get('backend/updatelist.php?type=col');
				}
			break;

			case 'category':
				if(id){
					return $http.get('backend/updatelist.php?type=cat&id='+id);
				}else{
					return $http.get('backend/updatelist.php?type=cat');
				}
			break;

			case 'item':
				if(id){
					console.log('return Item :'+id);
					return $http.get('backend/updatelist.php?type=item&id='+id);
				}else{
					console.log('return all Items');
					return $http.get('backend/updatelist.php?type=item');
				}
			break;

		}
	};


	return factory;

});

})();