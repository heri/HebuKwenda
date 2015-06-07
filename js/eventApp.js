// app.controller('eventsController', ['$scope', 'geolocation', 'eventfulAPI', function($scope,  geolocation, eventfulAPI) {
//
// 	$scope.events_search = function() {
// 		$scope.events = [];
// 		$scope.loadingEvents = true;
// 		geolocation.getLocation().then(function(data){
// 			geoData = data.coords;
// 			eventfulAPI.retrieveEvents(geoData, function(data) {
// 				console.log(data);
//
// 				$scope.events = data.events;
// 				$scope.loadingEvents = false;
// 				$scope.lat = geoData.latitude;
// 				$scope.lon = geoData.longitude;
// 			});
// 		});
//
// 	}
//
// }]).factory('eventfulAPI', function($resource){
// 	return {
// 		retrieveEvents: function(geoData, callback){
//
// 			var lat = geoData.latitude;
// 			var lon = geoData.longitude;
//
// 			var api = $resource('http://api.eventful.com/json/events/search?callback=JSON_CALLBACK&location=:location&app_key=:app_key&date=Today&image_sizes=large&page_size=10&sort_order=popularity&within=1', {
// 				location: lat + ',' + lon,
// 				app_key: 'mJC4XBfH6H6mkTMD'
// 			}, {
// 				fetch:{method:'JSONP'}
// 			});
// 			console.log(api);
// 			api.fetch({}, function(response){
// 				// console.log(response);
// 				callback(response);
// 			});
// 		}
// 	}
// }).directive('events', function() {
// 	return {
// 		templateUrl: 'partials/social.html'
// 	};
// });





			

// .factory("eventfulAPI", function($http) {
// 		return {
// 			"retrieveEvents": function(geoData, callback) {
//
// 				var lat = geoData.latitude;
// 				var lon = geoData.longitude;
// 				var method = 'GET';
// 				var url = 'http://api.eventful.com/json/events/search';
// 				var params = {
// 				callback: 'JSON_CALLBACK',
// 					,
// 					app_key: 'mJC4XBfH6H6mkTMD', //Token
// 					date: 'Today',
// 					image_sizes: 'large',
// 					sort_order: 'popularity',
// 					page_size: '10',
// 					within: '1'
// 				};
// 				// $http.jsonp(url, {params: params}).success(callback);
// 				$http.jsonp(url, {params: params}).success(function(data){
//         console.log(data.found);
//     });
// 			}
// 		}
// 	})

