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
					$state.go("dashboard");
				}, function(error) {
					$scope.loginModel.wrongCredentials = true;
				});
		};
	}]);


otpApp.controller("HomeController",["$scope", "User",
	function($scope, User) {
		$scope.registrationModel = {
			emailId : "",
			username : "",
			password : "",
			repeatPassword : "",
			usernameAvailable : true
		};

		$scope.regisetr = function() {
			User.register($scope.registrationModel.emailId, $scope.registrationModel.username, 
				$scope.registrationModel.password).
			then(function(data) {
				console.log(data);
				$scope.registrationModel = {
					emailId : "",
					username : "",
					password : "",
					repeatPassword : "",
					usernameAvailable : true
				};
				
			}, function(error) {
				console.log(error);
			});
		};
	}]);


otpApp.controller("AboutController",["$scope", 
	function($scope) {

	}]);



otpApp.controller("ContactController", ["$scope", 
	function($scope) {

	}]);

otpApp.controller("VerifyEmailController", ["$scope","verified","$state",
	function($scope, verified, $state) {
		$state.go("home");
	}]);

otpApp.controller("ForgotPasswordController", ["$scope", 
	function($scope) {

	}]);

otpApp.controller("ResetPasswordController", ["$scope", 
	function($scope) {

	}]);

otpApp.controller("DashboardController", ["$scope", 
	function($scope) {

	}]);

