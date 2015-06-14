function randomString(n,e){for(var r="",t=n;t>0;--t)r+=e[Math.round(Math.random()*(e.length-1))];return r}function getNeed(){var n=new Date,e=n.getHours(),r="";return r=9>e&&e>5?"breakfast":11>e&&e>8?"coffee":14>e&&e>10?"lunch":e>17&&21>e?"dinner":e>20?"beer":"coffee"}

var app = angular.module('eat', ['geolocation', 'ngRoute']);

app.controller('EatController', ['$scope', 'MyYelpAPI', 'geolocation', function($scope, MyYelpAPI, geolocation) {
	$scope.businesses = [];
	$scope.loading = true;
	$scope.modalOpened = false;
	
    $scope.openLogin = function(){
        var self = this;
        $('.photoModal').modal('show');
        if($scope.modalOpened) return;
        $('.photoModal').modal('show');
        $('.photoModal').on('hide.bs.modal', function (e) {$scope.modalOpened = false;});
        $scope.modalOpened = true;
    },
	
	geolocation.getLocation().then(function(data){
		geoData = data.coords;
		MyYelpAPI.retrieveYelp(geoData, function(data) {
			$scope.businesses = data.businesses;
			$scope.loading = false;
			$scope.lat = geoData.latitude;
			$scope.lon = geoData.longitude;
			console.log(data);
		});
	});

}]).factory("MyYelpAPI", function($http) {
	return {
		"retrieveYelp": function(geoData, callback) {
			var lat = geoData.latitude;
			var lon = geoData.longitude;
			var method = 'GET';
			var url = 'http://api.yelp.com/v2/search';
			var params = {
				callback: 'angular.callbacks._0',
				ll: lat + ',' + lon,
				oauth_consumer_key: 'fp2-QEWAkpGNtEpbNg0Bqw',oauth_token: 'et0LsDh2Q7oEwBIuCK_fESvMclBMXoNI',oauth_signature_method: "HMAC-SHA1",oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),oauth_timestamp: new Date().getTime(),
				term: getNeed(),
				sort: '2',limit: '5',adius_filter: '1200',
				category_filter: 'restaurants,coffee,bars,landmarks,arts'
			};
			var consumerSecret = 'cjt65LRYSM1iqU1766CQLrvYmEA';var tokenSecret = 'zYMatKtjA07897IQZDqyUgxpaR4';var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
			params['oauth_signature'] = signature;
			$http.jsonp(url, {params: params}).success(callback);
		}
	}
}).directive('myEat', function() {
	return {
		templateUrl: '../partials/eat.html'
	};
});
app.directive('login', function() {
		return {
			templateUrl: '../partials/login.html'
		};
	});
