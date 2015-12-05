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
		name : "dashboard",
		url : "/dashboard",
		templateUrl : "/public/otp-app/templates/dashboard.html",
		controller : "DashboardController",
		data : {
			secure : true
		}
	});
}]);