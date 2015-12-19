"use strict";

var otpApp = angular.module("otpApp");



otpApp.controller("NavbarController",["$scope", "AuthenticationManager", "$state",
	function($scope, AuthenticationManager, $state) {

		function newLoginModel() {
			return {
				username : "",
				password : "",
				wrongCredentials : false
			};
		}

		$scope.loginModel = newLoginModel();

		$scope.login = function() {
			AuthenticationManager.authenticate($scope.loginModel.username, 
					$scope.loginModel.password).then(function(success) {
					
					$scope.loginModel = newLoginModel();

					$state.go("dashboard");

				}, function(error) {
					$scope.loginModel.wrongCredentials = true;
				});
		};


		$scope.logout = function() {
			AuthenticationManager.logout();
			$state.go("home");
		};

	}]);


otpApp.controller("HomeController",["$scope", "User",
	function($scope, User) {

		function newRegistrationModel() {
			return {
				emailId : "",
				username : "",
				password : "",
				repeatPassword : "",
				usernameAvailable : true
			};
		}

		$scope.registrationModel = newRegistrationModel();

		$scope.regisetr = function() {
			User.register($scope.registrationModel.emailId, $scope.registrationModel.username, 
				$scope.registrationModel.password).
			then(function(data) {
				
				$scope.registrationModel = newRegistrationModel();
				
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


otpApp.controller("ChangePasswordController", ["$scope", "$rootScope", "User", "AuthenticationManager", "$state",
	function($scope, $rootScope, User, AuthenticationManager, $state) {
		function newPasswordChangeModel() {
			return {
				oldPassword : "",
				password : "",
				repeatPassword : "",
				wrongCredentials : false	
			};
		}

		$scope.passwordChangeModel = newPasswordChangeModel();

		$scope.changePassword = function() {
			User.changePassword($rootScope.authenticatedUser, $scope.passwordChangeModel.oldPassword , $scope.passwordChangeModel.password).then(function(result) {
				if(result.data.success) {
					$scope.passwordChangeModel = newPasswordChangeModel();

					AuthenticationManager.logout();

					$state.go("dashboard");

				} else {
					$scope.passwordChangeModel.wrongCredentials = true;
				}
				
			});
		};


	}]);

otpApp.controller("DashboardController", ["$scope",
	function($scope) {

	}]);

otpApp.controller("ProjectListController", ["$scope", "Project",
	function($scope, Project) {
		$scope.projects = Project.query();
	}]);


otpApp.controller("ProjectController", ["$scope", "Otp", "currentProject", "$state",
	function($scope, Otp, currentProject, $state) {

		$scope.project = currentProject;

		$scope.apiTestModel = {
			mobileNumber : "",
			requestId : "",
			otp : "",
			alerts : []
		};

		$scope.generateOtp = function() {
			Otp.request($scope.project.apiKey, $scope.apiTestModel.mobileNumber).then(function(result) {
				$scope.apiTestModel.requestId = result.data.requestId;
				$scope.apiTestModel.alerts.unshift({type : "success", message : "OTP Generated and sent to the mobile entered."});
			});
		};

		$scope.verifyOtp = function() {
			Otp.verify($scope.project.apiKey, $scope.apiTestModel.requestId, $scope.apiTestModel.otp).then(function(result) {
				if(result.data.success) {
					$scope.apiTestModel.alerts.unshift({type : "success", message : "OTP Verified Successfully!"});
				} else {
					$scope.apiTestModel.alerts.unshift({type : "danger", message : "OTP Verification failed!"});
				}
			});
		};

		$scope.clearOtpTest = function() {
			$scope.apiTestModel = {
				mobileNumber : "",
				requestId : "",
				otp : "",
				alerts : []
			};
		}

		$scope.deleteProject = function() {
			$scope.project.$remove().then(function() {
				$state.go("projects");
			});
		};

		$scope.updateConfig= function() {
			$scope.project.$update().then(function(result) {
				console.log(result);
			});
		};

	}]);

otpApp.controller("NewProjectController", ["$scope", "Project", "$state",
	function($scope, Project, $state) {
		

		$scope.newProject = new Project();

		$scope.createProject = function() {
			console.log($scope.newProject);
			$scope.newProject.$save().then(function(result) {
				console.log(result);
				$scope.newProjectModel = new Project();

				$state.go("projects");
			});
			
		};
	}]);

