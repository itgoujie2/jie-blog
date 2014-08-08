angular.module('jie-blog', ['ctrlModule', 'ngRoute'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl : '/views/partials/index.html',
				controller : 'IndexCtrl'
			})
			.when('/addPost', {
				templateUrl : '/views/partials/addPost.html',
				controller : 'AddPostCtrl'
			})
			.when('/readPost/:id', {
				templateUrl : '/views/partials/readPost.html',
				controller : 'ReadPostCtrl'
			})
			.when('/editPost/:id', {
				templateUrl : '/views/partials/editPost.html',
				controller : 'EditPostCtrl'
			})
			.when('/deletePost/:id', {
				templateUrl : '/views/partials/deletePost.html',
				controller : 'DeletePostCtrl'
			})
			.when('/login', {
				templateUrl : '/views/partials/login.html',
				controller : 'LoginCtrl'
			})
			.when('/signup', {
				templateUrl : '/views/partials/signup.html',
				controller : 'SignUpCtrl'
			})
			.otherwise({
				redirectTo : '/'
			});

		$locationProvider.html5Mode(true);
	}]);