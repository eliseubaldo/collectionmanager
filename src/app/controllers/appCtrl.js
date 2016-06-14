(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('appCtrl', appCtrl);

	appCtrl.$inject = ['$scope', '$mdSidenav'];

	function appCtrl ($scope, $mdSidenav){

		
		$scope.toggleLeft = function() {
		    $mdSidenav('leftMenu').toggle();
		};

	}

})();	

