
var app = angular.module('event', ['ngRoute', 'geolocation', 'angularReverseGeocode', 'ngResource']).config(['$httpProvider', function($httpProvider) {
	delete $httpProvider.defaults.headers.common["X-Requested-With"];
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = false;
	$httpProvider.defaults.headers.common["Accept"] = "application/json";
	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    }]);
	

app.controller('EventsController', function($scope, $http, eventsSearch) {	
	$scope.loading = true;
	
	$http.defaults.useXDomain = true;
	
	
    $http.get('https://www.kimonolabs.com/api/3a6iwfho?apike=iiDTrAT8sYuyhaOMh2O2TwVb8auHKckz')
        .success(function(data) {
			var movies = data.results.events;
			$scope.loading = false;
        });
	
	// eventsSearch.fetchLocal(function(data){
	// 	var movies = data.results.events;
	// 	$scope.loading = false;
	// });
	
})

app.factory('eventsSearch', function($resource){
	return {
		fetchLocal: function(callback){

			var api = $resource('https://www.kimonolabs.com/api/3a6iwfho', {
				apikey: 'iiDTrAT8sYuyhaOMh2O2TwVb8auHKckz'
			}, {
				fetch:{method:'GET'}
			});

			api.fetch({}, function(response){
				console.log(response);
				callback(response);
			});
		}
	}
});


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
