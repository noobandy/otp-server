var otpApp = angular.module("otpApp");

otpApp.factory("Project", ["$resource", "otpAppConfig",
	function($resource, otpAppConfig) {

		return $resource(otpAppConfig.basePath+"projects/:id", {
			id : "@_id"
		}, {
			update : {
				method : "PUT"
			}
		});
	}]);