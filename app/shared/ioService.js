(function(){
	'use strict';

angular
	.module('collectionApp')
	.factory('ioService', function($http){
	
	var factory = {};

	factory.addCollection = function(collection){
		console.log(collection);
		return $http.post('include.php?type=col',collection);
	}

	factory.singleContact = function(id){
		
		return $http.get('getcontact.php?id=' + id);
	
	}

	factory.updateList = function(type){
		switch (type) {
			case 'collection':
				return $http.get('updatelist.php?type=col');
			break;

		}
	}


	return factory;

});

})();