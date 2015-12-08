var otpApp = angular.module("otpApp");

otpApp.config(["$httpProvider",
	function($httpProvider) {

		$httpProvider.interceptors.push(["$q", "$rootScope", 
			function($q, $rootScope) {
				return {
					request : function(config) {
						if($rootScope.authenticatedUser) {
							config.headers.authorization = "Basic "+$rootScope.credentials;
							console.log(config.headers);
						}
						return config;
					}
				};
			}]);
	}]);