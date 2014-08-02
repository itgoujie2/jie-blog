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

ctrlModule.controller('AddPostCtrl', function($http, $scope, $location){
	$scope.form = {};

	$scope.submitPost = function(){

		$http.post('/api/posts', $scope.form)
			.success(function(data){		
				$scope.form = {};
				$location.path('/');
			})
			.error(function(data){
				console.log('errors: ' + data);
			});
	};
});

ctrlModule.controller('DeletePostCtrl', function($http, $scope, $location, $routeParams){

	$http.get('/api/post/' + $routeParams.id)
		.success(function(data){
			$scope.post = data;
		});

	$scope.deletePost = function(){
		$http.delete('/api/posts/' + $routeParams.id)
			.success(function(data){
				$location.path('/');
			})
			.error(function(data){
				console.log('error: ' + data);
			});
	};
});

ctrlModule.controller('EditPostCtrl', function($http, $scope, $location, $routeParams){

	$http.get('/api/post/' + $routeParams.id)
		.success(function(data){
			$scope.form = data;
		});	

	$scope.editPost = function(){
		$http.put('/api/posts/' + $routeParams.id, $scope.form)
			.success(function(data){
				$location.path('/');
			})
			.error(function(data){
				console.log('error : ' + data);
			});
	};
});