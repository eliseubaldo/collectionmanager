(function(){
	'use strict';


	angular
		.module('collectionApp')
		.directive('dashboard' ,function(){

			return{
				restrict: 'E',
				scope:{
					dash: '=',
					collectionList: '='
				},
				templateUrl: 'views/templates/dashboard.html'
			};
		});

})();	

