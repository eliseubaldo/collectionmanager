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

