"use strict";
var otpApp = angular.module("otpApp");

otpApp.service("AuthenticationManager", ["$http", "$rootScope", "localStorageService",
	"$base64","$q", "otpAppConfig",
	function($http, $rootScope, localStorageService, $base64, $q, otpAppConfig){

		return {
			authenticate : function(username, password) {

				return $http({
					url : otpAppConfig.basePath + "users/"+username+"/checkpassword",
					method : "POST",
					data : {
						password : password
					}
				}).then(function(result) {
					if(result.data.success) {
						localStorageService.set("authenticatedUser", username);
						var credentials = $base64.encode(username + ":" + password);
						localStorageService.set("credentials", credentials);

						$rootScope.$broadcast("otpAppAuthSuccess", username, credentials);
					}
					return result;
				}, function(error) {
					$rootScope.$broadcast("otpAppAuthFailed");
					return error;
				});


			},
			isAuthenticated : function() {
				var authenticatedUser = localStorageService.get("authenticatedUser");
				return  authenticatedUser !== null;
			},
			getAuthenticatedUser : function() {
				return localStorageService.get("authenticatedUser");
				
			},
			getCredentials : function() {
				return localStorageService.get("credentials");
			},
			logout : function() {
				localStorageService.remove("authenticatedUser");
				
				localStorageService.remove("credentials");

				$rootScope.$broadcast("otpAppAuthCleared");
			}
		}
	}]);


otpApp.service("User", [ "$http", "otpAppConfig",
	function($http, otpAppConfig){

		return {
			register : function(emailId, username, password) {
				return $http({
					url : otpAppConfig.otpAppConfig.basePath + "users",
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
					url : otpAppConfig.basePath + "users/"+username+"/verifyemail",
					method : "POST",
					data : {
						key : key
					}
				});
			},
			sendPasswordResetLink : function(username) {
				return $http({
					url : otpAppConfig.basePath + "users/"+username+"/forgotpassword",
					method : "POST",
					data : {
					}
				});
			},
			resetPassword : function(username, key, newPassword) {
				return $http({
					url : otpAppConfig.basePath + "users/"+username+"/resetpassword",
					method : "POST",
					data : {
						newPassword : newPassword,
						key : key
					}
				});
			},
			changePassword : function(username, oldPassword, newPassword) {
				return $http({
					url : otpAppConfig.basePath + "users/"+username+"/changepassword",
					method : "POST",
					data : {
						newPassword : newPassword,
						oldPassword : oldPassword
					}
				});
			}
		};
	}]);


otpApp.service("Otp", [ "$http", "otpAppConfig",
	function($http, otpAppConfig) {

		return {
			request : function(apiKey, mobileNumber) {
				return $http({
					url : otpAppConfig.basePath  + "api/otp/request?apiKey="+apiKey,
					method : "POST",
					data : {
						mobileNumber : mobileNumber
					}
				});
			},
			verify : function(apiKey, requestId, userResponse) {
				return $http({
					url : otpAppConfig.basePath + "api/otp/verify?apiKey="+apiKey,
					method : "POST",
					data : {
						requestId : requestId,
						otp : userResponse
					}
				});
			}
		};
	}]);