"use strict";
var otpApp = angular.module("otpApp");

otpApp.service("AuthenticationManager", ["$http",
	function($http){
		var basePath = "http://localhost:3000/";

		return {
			authenticate : function(username, password) {
				return $http({
					url : basePath + "users/"+username+"/checkpassword",
					method : "POST",
					data : {
						password : password
					}
				});
			},
			isAuthenticated : function() {

			},
			getAuthenticatedUser : function() {

			},
			logout : function() {

			}
		}
	}]);


otpApp.service("User", [ "$http",
	function($http){
		var basePath = "http://localhost:3000/";

		return {
			register : function(emailId, username, password) {
				return $http({
					url : basePath + "users",
					method : "POST",
					data : {
						username : username,
						emailId : emailId,
						password : password
					}
				});
			},
			verifyEmailId : function(username, key) {
				return $http({
					url : basePath + "users/"+username+"/verifyemail",
					method : "POST",
					data : {
						key : key
					}
				});
			},
			sendPasswordResetLink : function(username) {
				return $http({
					url : basePath + "users/"+username+"/forgotpassword",
					method : "POST",
					data : {
					}
				});
			},
			resetPassword : function(username, key, newPassword) {
				return $http({
					url : basePath + "users/"+username+"/resetpassword",
					method : "",
					data : {
						newPassword : newPassword,
						key : key
					}
				});
			}
		};
	}]);