"use strict";

var otpApp = angular.module("otpApp", ["ngResource","ui.router","LocalStorageModule",
	"pascalprecht.translate", "angular-loading-bar"]);

otpApp.config(["localStorageServiceProvider",
	function(localStorageServiceProvider) {
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

otpApp.run([
	function() {
		console.log("running");
	}]);