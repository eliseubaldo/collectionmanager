(function(){
	'use strict';

angular
	.module('collectionApp')
	.factory('ioService', function($http){
	
	var factory = {};


	factory.addCollection = function(collection){
		
		return $http.post('backend/include.php?type=col',collection);
		
	};

	factory.addCategory = function(category){
		console.log(category);
		return $http.post('backend/include.php?type=cat',category);
	};

	factory.updateList = function(type, id, coll){
		switch (type) {
			case 'collection':
				if(id){
					console.log('return collection :'+id);
					return $http.get('backend/updatelist.php?type=col&id='+id);
				}else{
					return $http.get('backend/updatelist.php?type=col');
				}
			break;

			case 'category':
				if(id){
					return $http.get('backend/updatelist.php?type=cat&id='+id);
				}else{
					return $http.get('backend/updatelist.php?type=cat');
				}
			break;

			case 'item':
				if(id){
					console.log('return Item :'+id);
					return $http.get('backend/updatelist.php?type=item&id='+id);
				}else if(coll){
					console.log('return all Items from coll:'+ coll);
					return $http.get('backend/updatelist.php?type=item&coll='+coll);
				}else{
					console.log('return all Items in all collections');
					return $http.get('backend/updatelist.php?type=item');
				}
			break;

			case 'dash':
				return $http.get('backend/updatelist.php?type=dash');
			break;

		}
	};


	return factory;

});

})();