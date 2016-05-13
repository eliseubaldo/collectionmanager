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

