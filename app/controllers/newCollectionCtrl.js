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

