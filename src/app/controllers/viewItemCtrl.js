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

