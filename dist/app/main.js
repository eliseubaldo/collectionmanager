(function(){
    'user strict';

    angular.module('collectionApp', ['ui.router', 'ngMaterial', 'ngFileUpload' ]);

    angular
        .module('collectionApp')
        .constant('config', {
            uploadpath: 'uploads/',
            api: '../backend/'
        });
    
})();


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

		init();

		function init(){
			ioService.updateList('category')
				.then(function(response){
					$scope.categoryList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});

            	ioService.updateList('collection')
				.then(function(response){
					$scope.collectionList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}

		function updateCategory(){
			ioService.updateList('category')
				.then(function(response){
					$scope.categoryList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}


        $scope.getToastPosition = function() {
                return Object.keys($scope.toastPosition)
                    .filter(function(pos) { return $scope.toastPosition[pos]; })
                    .join(' ');
        };

        $scope.setCollection = function(collection){
			var str = JSON.parse(collection);
			$scope.currCollection = str;
		};



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

		init();

		function init(){

			//populate category
				ioService.updateList('category')
				.then(function(response){
					$scope.categoryList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
            	
			//populate collection
            	ioService.updateList('collection')
				.then(function(response){
					$scope.collectionList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}

		
		$scope.setCollection = function(collection){
			var str = JSON.parse(collection);
			$scope.currCollection = str;
		};


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


		


	}


})();	


(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('appCtrl', appCtrl);

	appCtrl.$inject = ['$scope', '$mdSidenav'];

	function appCtrl ($scope, $mdSidenav){

		
		$scope.toggleLeft = function() {
		    $mdSidenav('leftMenu').toggle();
		};

	}

})();	


(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('browseCtrl', browseCtrl);

	browseCtrl.$inject = ['$scope', 'ioService', 'config', '$stateParams'];

	function browseCtrl ($scope, ioService, config, $stateParams){

		$scope.categoryList = [];
		$scope.collectionList = [];
		$scope.itemList = [];
		$scope.currentCategory = {};
		$scope.currCollection = {};
		$scope.uploadpath = config.uploadpath;		
		
		// If already have a collection in stateParameters
		if($stateParams.collection_id){

			var coll_id = $stateParams.collection_id

			ioService.updateList('collection', coll_id)
				.then(function(response){
					console.log('coll do if:'+ response.data);
					$scope.currCollection = response.data[0];
					$scope.collection = $scope.currCollection;
					getItems(false, coll_id);
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}


		init();

		function init(){

			ioService.updateList('category')
				.then(function(response){
					$scope.categoryList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		
				ioService.updateList('collection', false)
				.then(function(response){
					$scope.collectionList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});          			
			
		}		


		function getItems(id,coll){
			console.log('getting items');
			ioService.updateList('item',id,coll)
				.then(function(response){
					$scope.itemList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}


		$scope.setCollection = function(collection){
			var str = JSON.parse(collection);
			console.log('coll do set:'+ str);
			$scope.currCollection = str;
			getItems(false, $scope.currCollection.collection_id);
		};

		$scope.setCategory = function(category){
			var str = JSON.parse(category);
			$scope.currentCategory = str;					
		};



	}


})();	


(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$scope', 'ioService', '$mdSidenav'];

	function homeCtrl ($scope, ioService, $mdSidenav){

		$scope.collectionList = [];
		$scope.dash = {};
		

		checkCollection();
		
		function checkCollection(){
			ioService.updateList('collection')
				.then(function(response){					
					$scope.collectionList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});

            ioService.updateList('dash')
				.then(function(response){					
					$scope.dash = response.data;
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
				.then(function(response)
				{
					$scope.item = response.data;
					getCollection($scope.item[0].collection_id);
												
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}

		function getCollection(collectionid){
					
			ioService.updateList('collection',collectionid)
				.then(function(response)
				{
					$scope.collection = response.data;
					$scope.item[0].collection_name = $scope.collection[0].collection_name;
					getCategory($scope.item[0].category_id);
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}

		function getCategory(categoryid){

				ioService.updateList('category', categoryid)
					.then(function(response)
					{
						$scope.category = response.data;
						$scope.item[0].category_name = $scope.category[0].category_name;
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
		.directive('dashboard' ,function(){

			return{
				restrict: 'E',
				scope:{
					dash: '=',
					collectionList: '='
				},
				templateUrl: 'views/templates/dashboard.html'
			};
		});

})();	


(function(){
	'use strict';

angular
	.module('collectionApp')
	.factory('ioService', function($http, config){
	
	var factory = {};


	factory.addCollection = function(collection){
		
		return $http.post(config.api + 'include.php?type=col',collection);
		
	};

	factory.addCategory = function(category){
		console.log(category);
		return $http.post('backend/include.php?type=cat',category);
	};

	factory.updateList = function(type, id, coll){
		switch (type) {
			case 'collection':
				if(id){
					console.log('return collection :'+id);
					return $http.get(config.api + 'updatelist.php?type=col&id='+id);
				}else{
					return $http.get(config.api + 'updatelist.php?type=col');
				}
			break;

			case 'category':
				if(id){
					return $http.get(config.api + 'updatelist.php?type=cat&id='+id);
				}else{
					return $http.get(config.api + 'updatelist.php?type=cat');
				}
			break;

			case 'item':
				if(id){
					console.log('return Item :'+id);
					return $http.get(config.api + 'updatelist.php?type=item&id='+id);
				}else if(coll){
					console.log('return all Items from coll:'+ coll);
					return $http.get(config.api + 'updatelist.php?type=item&coll='+coll);
				}else{
					console.log('return all Items in all collections');
					return $http.get(config.api + 'updatelist.php?type=item');
				}
			break;

			case 'dash':
				return $http.get(config.api + 'updatelist.php?type=dash');
			break;

		}
	};


	return factory;

});

})();
(function(){
    'use strict';

    // Loader Service
angular
    .module('collectionApp')
    .service('LoadingInterceptor', ['$q', '$rootScope', '$log', 
    function ($q, $rootScope, $log) {
        
        var xhrCreations = 0;
        var xhrResolutions = 0;
     
        function isLoading() {
            return xhrResolutions < xhrCreations;
        }
     
        function updateStatus() {
            $rootScope.loading = isLoading();
        }
     
        return {
            request: function (config) {
                xhrCreations++;
                updateStatus();
                return config;
            },
            requestError: function (rejection) {
                xhrResolutions++;
                updateStatus();
                $log.error('Request error:', rejection);
                return $q.reject(rejection);
            },
            response: function (response) {
                xhrResolutions++;
                updateStatus();
                return response;
            },
            responseError: function (rejection) {
                xhrResolutions++;
                updateStatus();
                $log.error('Response error:', rejection);
                return $q.reject(rejection);
            }
        };
    }]);

})();