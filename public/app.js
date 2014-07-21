angular.module('jie-blog', ['ctrlModule'])
	.config([$routeProvider, $locationProvider, function($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl : 'views/partials/index',
				controller : 'IndexCtrl'
			})
			.when('/addPost', {
				templateUrl : 'views/partials/addPost',
				controller : 'AddPostCtrl'
			})
			.when('/readPost/:id', {
				templateUrl : 'views/partials/readPost',
				controller : 'ReadPostCtrl'
			})
			.when('/editPost/:id', {
				templateUrl : 'views/partials/editPost',
				controller : 'EditPostCtrl'
			})
			.when('/deletePost/:id', {
				templateUrl : 'views/partials/deletePost',
				controller : 'DeletePostCtrl'
			})
			.otherwise({
				redirectTo : '/'
			});
	}]);