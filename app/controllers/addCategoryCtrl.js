(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('addCategoryCtrl', addCategoryCtrl);

	addCategoryCtrl.$inject = ['$scope', 'ioService'];

	function addCategoryCtrl ($scope, ioService){

		$scope.categoryList = [];

		$scope.collectionList = [];
		$scope.selectedOption = {}

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

