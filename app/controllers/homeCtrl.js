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

