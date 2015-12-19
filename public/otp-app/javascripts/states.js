"use strict";

angular.module("otpApp").config(["$stateProvider", "$urlRouterProvider", 
	function($stateProvider, $urlRouterProvider) {
	
	// For any unmatched url, redirect to /
  	$urlRouterProvider.otherwise("/");

	$stateProvider.state({
		name : "home",
		url : "/",
		templateUrl : "/public/otp-app/templates/home.html",
		controller : "HomeController",
		data : {
			secure : false
		}
	}).state({
		name : "about",
		url : "/about",
		templateUrl : "/public/otp-app/templates/about.html",
		controller : "AboutController",
		data : {
			secure : false
		}
	}).state({
		name : "contact",
		url : "/contact",
		templateUrl : "/public/otp-app/templates/contact.html",
		controller : "ContactController",
		data : {
			secure : false
		}
	}).state({
		name : "verify emailId",
		url : "/verifyemaill/:username/:key",
		controller : "VerifyEmailController",
		resolve : {
			verified : ["$q", "User","$stateParams", function($q, User, $stateParams) {
				var promise = $q.defer();
				User.verifyEmailId($stateParams.username, $stateParams.key).
				then(function(data) {
					promise.resolve(data.success);
				}, function(error) {
					promise.reject(error);
				});

				return promise;
			}]
		},
		data : {
			secure : false
		}
	}).state({
		name : "forgot password",
		url : "/forgotpassword",
		templateUrl : "/public/otp-app/templates/forgotpassword.html",
		controller : "ForgotPasswordController",
		data : {
			secure : false
		}
	}).state({
		name : "reset password",
		url : "/resetpassword/:username/:key",
		templateUrl : "/public/otp-app/templates/resetpassword.html",
		controller : "ResetPasswordController",
		data : {
			secure : false
		}
	}).state({
		name : "change password",
		url : "/changepassword",
		templateUrl : "/public/otp-app/templates/changepassword.html",
		controller : "ChangePasswordController",
		data : {
			secure : true
		}
	}).state({
		name : "dashboard",
		url : "/dashboard",
		templateUrl : "/public/otp-app/templates/dashboard.html",
		controller : "DashboardController",
		data : {
			secure : true
		}
	}).state({
		name : "projects",
		url : "/projects",
		templateUrl : "/public/otp-app/templates/projects.html",
		controller : "ProjectListController",
		data : {
			secure : true
		}
	}).state({
		name : "project",
		url : "/projects/:id",
		templateUrl : "/public/otp-app/templates/project.html",
		controller : "ProjectController",
		data : {
			secure : true
		},
		resolve : {
			currentProject : ["Project", "$stateParams",
			function(Project, $stateParams) {
				return Project.get({id : $stateParams.id});
			}]
		}
	}).state({
		name : "newproject",
		url : "/newproject",
		templateUrl : "/public/otp-app/templates/newproject.html",
		controller : "NewProjectController",
		data : {
			secure : true
		}
	});
}]);



//ensure that user is authecticate before state change for secure states
otpApp.run(["$rootScope", "AuthenticationManager",
	function($rootScope, AuthenticationManager) {
		$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
			if(toState.data && toState.data.secure  && !AuthenticationManager.isAuthenticated()) {
				event.preventDefault();
			}
		});
	}]);