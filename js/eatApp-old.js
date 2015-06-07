function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}
	
function getNeed() {
	var d = new Date();
	var hour = d.getHours();

	var search = '';
	if (hour < 9 && hour > 5) {
		search = 'breakfast';
	} else if (hour < 11 && hour > 8) {
		search = 'coffee';
	} else if (hour < 14 && hour > 10) {
		search = 'lunch';
	} else if (hour > 17 && hour < 21) {
		search = 'dinner'
	} else if (hour > 20)  {
		search = 'beer';
	} else  {
		search = 'must-see';
	}
	return search;
}

var app = angular.module('eat', ['geolocation']);


app.controller('MainCtrl', ['$scope', 'MyYelpAPI', 'geolocation', function($scope, MyYelpAPI, geolocation) {
	$scope.businesses = [];
	$scope.loading = true;
	$scope.modalOpened = false;
	
    $scope.openLogin = function(){
        var self = this;
        $('.photoModal').modal('show');
        if($scope.modalOpened) return;
        $('.photoModal').modal('show');
        $('.photoModal').on('hide.bs.modal', function (e) {
            $scope.modalOpened = false;
        });
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
				oauth_consumer_key: 'fp2-QEWAkpGNtEpbNg0Bqw', //Consumer Key
				oauth_token: 'et0LsDh2Q7oEwBIuCK_fESvMclBMXoNI', //Token
				oauth_signature_method: "HMAC-SHA1",
				oauth_timestamp: new Date().getTime(),
				oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
				term: getNeed(),
				sort: '2',
				limit: '8',
				radius_filter: '1200',
				category_filter: 'restaurants,coffee,bars,landmarks,arts'
			};
			var consumerSecret = 'cjt65LRYSM1iqU1766CQLrvYmEA'; //Consumer Secret
			var tokenSecret = 'zYMatKtjA07897IQZDqyUgxpaR4'; //Token Secret
			var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
			params['oauth_signature'] = signature;
			$http.jsonp(url, {params: params}).success(callback);
		}
	}
}).directive('myEat', function() {
	return {
		templateUrl: 'partials/eat.html'
	};
});

app.directive('login', function() {
		return {
			templateUrl: 'partials/login.html'
		};
	});
