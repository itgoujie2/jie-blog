var ctrlModule = angular.module('ctrlModule', []);

ctrlModule.controller('IndexCtrl', function($http, $scope){

	$http.get('/api/posts')
		.success(function(data){
			$scope.posts = data;
		})
		.error(function(data){
			console.log('errors: ' + data);
		});
});

ctrlModule.controller('AddPostCtrl', function($http, $scope){

	
});