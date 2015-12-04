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
		name : "dashboard",
		url : "/dashboard",
		templateUrl : "/public/otp-app/templates/dashboard.html",
		controller : "DashboardController",
		data : {
			secure : true
		}
	});
}]);