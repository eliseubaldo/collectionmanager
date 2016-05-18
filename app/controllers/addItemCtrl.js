(function(){
	'use strict';


angular
	.module('collectionApp')
	.controller('addItemCtrl', addItemCtrl);

	addItemCtrl.$inject = ['$scope', 'ioService', 'Upload', '$timeout','$mdToast', '$animate'];

	function addItemCtrl ($scope, ioService, Upload, $timeout, $mdToast, $animate){

		$scope.categoryList = [];
		$scope.collectionList = [];
		$scope.currCollection = {};

		//Upload button material style
		var input = document.getElementById("fileInput");
		var button = document.getElementById("uploadButton");	   
	    button.addEventListener("click", function(){
	    	input.click();
	  	});

		$scope.toastPosition = {
                bottom: false,
                top: true,
                left: false,
                right: true
        };		

		getCollections();
		getCategory();

		$scope.setCollection = function(collection){
			var str = JSON.parse(collection);
			$scope.currCollection = str;
		}


		$scope.getToastPosition = function() {
                return Object.keys($scope.toastPosition)
                    .filter(function(pos) { return $scope.toastPosition[pos]; })
                    .join(' ');
        };

		$scope.submitForm = function(item){
			var collname = $scope.currCollection.collection_name;	
			var collid = $scope.currCollection.collection_id;	
			

			console.log("collname:"+collname + " id:"+ collid );
			
			
			if($scope.itemForm.$valid){				
				Upload.upload({
				      url: 'backend/include.php?type=item',
				      method: 'POST',
				      data:{file:$scope.item.picture, otherinfo:item, collName:collname, collId:collid}
				    })
					.then(function (resp) {
						$mdToast.show( $mdToast.simple().content('Item '+ item.name + ' added !').position($scope.getToastPosition()).hideDelay(3000) );
						$scope.itemForm.$setPristine();
						$scope.item = null;
								
			            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			        }, function (resp) {
			            console.log('Error status: ' + resp.status);
			        }, function (evt) {
			            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			        });			    	

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

