(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('newCollectionCtrl', newCollectionCtrl);

	newCollectionCtrl.$inject = ['$scope'];

	function newCollectionCtrl ($scope){

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

