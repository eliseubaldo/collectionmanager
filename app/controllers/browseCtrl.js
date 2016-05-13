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

