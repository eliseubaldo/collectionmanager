(function(){
	'use strict';

angular
	.module('collectionApp')
	.factory('ioService', function($http){
	
	var factory = {};


	factory.addCollection = function(collection){
		console.log(collection);
		return $http.post('backend/include.php?type=col',collection);
	};

	factory.addCategory = function(category){
		console.log(category);
		return $http.post('backend/include.php?type=cat',category);
	};

	/*factory.addItem = function(item){
		console.log(item);
		return $http.post('backend/include.php?type=item',item);
	}; */

	factory.singleContact = function(id){
		
		return $http.get('backend/getcontact.php?id=' + id);
	
	};

	factory.updateList = function(type){
		switch (type) {
			case 'collection':
				return $http.get('backend/updatelist.php?type=col');
			break;
			case 'category':
				return $http.get('backend/updatelist.php?type=cat');
			break;
			case 'item':
				return $http.get('backend/updatelist.php?type=item');
			break;

		}
	};


	return factory;

});

})();