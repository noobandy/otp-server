"use strict";

var otpApp = angular.module("otpApp", ["ngResource","ui.router","LocalStorageModule",
	"pascalprecht.translate", "angular-loading-bar", "base64"]);

otpApp.config(["localStorageServiceProvider",
	function(localStorageServiceProvider) {
		localStorageServiceProvider.setStorageType('sessionStorage');
		localStorageServiceProvider.setPrefix("otpApp");
	}]);

otpApp.config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.spinnerTemplate = '<div id="pluswrap">\
	<div class="plus">\
	<img src="/public/otp-app/images/loader.gif">\
	</div>\
	</div>';

}]);


otpApp.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		files: [{
			prefix: '/public/otp-app/languages/',
			suffix: '.json'
		}]
	});
	$translateProvider.preferredLanguage('en');
	$translateProvider.fallbackLanguage('en');
}]);


/*//listen for authenticated events and set/unset authenticatedUser on root scope
otpApp.run(["$rootScope",
	function($rootScope) {
		$rootScope.$on("otpAppAuthSuccess", function(event, authenticatedUser) {
			$rootScope.otpApp.authenticatedUser = authenticatedUser;
		});

		$rootScope.$on("otpAppAuthFailed", function(event) {
			delete $rootScope.otpApp.authenticatedUser;
		});

		$rootScope.$on("otpAppAuthCleared", function(event) {
			delete $rootScope.otpApp.authenticatedUser;
		});

	}]);*/

otpApp.run(["$rootScope", "AuthenticationManager", 
	function($rootScope, AuthenticationManager) {
		if(AuthenticationManager.isAuthenticated()) {
			$rootScope.authenticatedUser = AuthenticationManager.getAuthenticatedUser();
		}
	}]);

otpApp.run(["$rootScope",
	function($rootScope) {
	}]);