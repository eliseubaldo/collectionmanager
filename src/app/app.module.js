(function(){
    'user strict';

    angular.module('collectionApp', ['ui.router', 'ngMaterial', 'ngFileUpload' ]);

    angular
        .module('collectionApp')
        .constant('config', {
            uploadpath: 'uploads/',
            api: '../backend/'
        });
    
})();

