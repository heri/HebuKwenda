var app = angular.module('event', ['ngRoute', 'geolocation', 'angularReverseGeocode', 'ngResource']).config(['$httpProvider', function($httpProvider) {
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.useXDomain = true;$httpProvider.defaults.withCredentials = false;$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    }]);
	
app.controller('EventsController', function($scope, $http) {	
	$scope.loading = true;
    $http.get('https://www.kimonolabs.com/api/3a6iwfho?apike=iiDTrAT8sYuyhaOMh2O2TwVb8auHKckz').success(function(data) {
			console.log(data.results.events);$scope.loading = false;$scope.events = data.results.events;
     });
	$scope.orderByNeed = function(item) {return - item.description[2].text.slice(0,1);}
})

app.directive('flickrs', function() {
		return {
			templateUrl: '../partials/event.html'
		};
	});
	
app.directive('login', function() {
		return {
			templateUrl: '../partials/login.html'
		};
	});
