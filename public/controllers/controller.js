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

ctrlModule.controller('ReadPostCtrl', function($http, $scope, $routeParams){
	$http.get('/api/post/' + $routeParams.id)
		.success(function(data){
			$scope.post = data;
		});
});

ctrlModule.controller('LoginCtrl', function($http, $scope, $location, $rootScope){
	$scope.login = function(){
		var info = {
			grant_type : 'password',
			client_id : 'jie',
			client_secret : 'Aa19890301',
			username : $scope.email,
			password : $scope.password
		};
		$http.post('/login', info)
			.success(function(data){
				$rootScope.access_token = data.access_token;
				$rootScope.refresh_token = data.refresh_token;
				$location.path('/');
			})
			.error(function(data){
				$location.path('/login');
			});
	};
});

ctrlModule.controller('SignUpCtrl', function($http, $scope, $location){
	$scope.signup = function(){
		$http.post('/signup', {
			email : $scope.email,
			password : $scope.password
		})
			.success(function(data){
				$location.path('/');
			})
			.error(function(data){
				$location.path('/signup');
			});
	}
});