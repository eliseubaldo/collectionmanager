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

