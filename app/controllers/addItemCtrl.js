(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('addItemCtrl', addItemCtrl);

	addItemCtrl.$inject = ['$scope', 'ioService', 'Upload', '$timeout'];

	function addItemCtrl ($scope, ioService, Upload, $timeout){

		$scope.categoryList = [];
		$scope.collectionList = [];		

		getCollections();
		getCategory();

		$scope.submitForm = function(item){
			if($scope.itemForm.$valid){
				var newitem = {};
				newitem.name = item.name;
				newitem.desc = item.desc;
				//newitem.picture = item.picture;
				newitem.category = item.category.category_id;				
				// same problem here as the category view

				Upload.upload({
				      url: 'backend/include.php?type=item',
				      method: 'POST',
				      data:{file:$scope.item.picture, otherinfo:item}
				    })
					.then(function (resp) {
			            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			        }, function (resp) {
			            console.log('Error status: ' + resp.status);
			        }, function (evt) {
			            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			        });
			    	

				/* ioService.addItem(newitem)
				.then(function(response){
					$scope.itemForm.$setPristine();
					$scope.item = null;
					alert(response.data);					
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	}); */ 
			}

		};


		function getCategory(){
			ioService.updateList('category')
				.then(function(response){
					$scope.categoryList = response.data;
				})
				.catch(function (response) {
                	alert('Error:', response.status, response.data);
            	});
		}

		function getCollections(){
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

