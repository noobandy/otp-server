"use strict";

var otpApp = angular.module("otpApp");



otpApp.controller("NavbarController",["$scope", "AuthenticationManager", "$state",
	function($scope, AuthenticationManager, $state) {
		$scope.loginModel = {
			username : "",
			password : "",
			wrongCredentials : false
		};

		$scope.login = function() {
			AuthenticationManager.authenticate($scope.loginModel.username, 
				$scope.loginModel.password).then(function(success) {
					$state.go("")
				}, function(error) {
					$scope.loginModel.wrongCredentials = true;
				});
		};
	}]);


otpApp.controller("HomeController",["$scope",
	function($scope, AuthenticationManager, $state) {
		$scope.registrationModel = {
			emailId : "",
			username : "",
			password : "",
			repeatPassword : "",
			usernameAvailable : true
		};

		$scope.regisetr = function() {
			console.log($scope.registrationModel);
		};
	}]);


otpApp.controller("AboutController",["$scope", 
	function($scope) {

	}]);



otpApp.controller("ContactController",["$scope", 
	function($scope) {

	}]);

otpApp.controller("DashboardController",["$scope", 
	function($scope) {

	}]);