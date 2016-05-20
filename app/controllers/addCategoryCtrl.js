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

