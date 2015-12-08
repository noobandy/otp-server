var otpApp = angular.module("otpApp");

otpApp.factory("Project", ["$resource", 
	function($resource) {
		var basePath = "http://localhost:3000";
		return $resource(basePath+"/projects/:id", {
			id : "@_id"
		}, {
			update : {
				method : "PUT"
			}
		});
	}]);