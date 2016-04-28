(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$scope'];

	function homeCtrl ($scope){

		$scope.submitForm = function(contact){
			if($scope.ContactForm.$valid){
				ContactService.addContact(contact)
				.then(function(response){
					$scope.ContactForm.$setPristine();
					$scope.contact = null;
					alert(' Contact added!');
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
			}

		}

	}

})();	

