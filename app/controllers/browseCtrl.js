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
			
				ioService.updateList('item')
				.then(function(response){
					$scope.itemList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}		


		$scope.setCollection = function(collection){
			var str = JSON.parse(collection);
			$scope.currCollection = str;
		};

		$scope.setCategory = function(category){
			var str = JSON.parse(category);
			$scope.currentCategory = str;
			
		};

		


	}


})();	

