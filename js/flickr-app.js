function getNeed(){var t=new Date,e=t.getHours(),r="";return r=11>e?"nature OR flower OR architecture":15>e&&e>11?"food OR park OR architecture OR art":e>16&&20>e?"art OR festival OR architecture OR history OR food":e>20?"night":"architecture"}

var app = angular.module('flickr', ['ngRoute', 'geolocation', 'angularReverseGeocode']);

app.controller('NotableController',function($scope, $http, geolocation) {
	$scope.photos = [];
    $scope.modalOpened = false;
	$scope.loading = true;
	
    $scope.openLogin = function(){
        var self = this;
        $('.photoModal').modal('show');
        if($scope.modalOpened) return;
        $('.photoModal').modal('show');
        $('.photoModal').on('hide.bs.modal', function (e) {
            $scope.modalOpened = false;
        });
        $scope.modalOpened = true;
    }
	
	$scope.orderByNeed = function(item) {
		if ($scope.geoData && item.users_rating && item.users_rating > 3) {
			a = item.latitude - $scope.geoData.latitude;b = item.longitude - $scope.geoData.longitude;
			return - item.views - (12 * item.users_rating) - (1700 * Math.sqrt( a * a + b * b)) ;
		} else {return 0;}
	}

	
	geolocation.getLocation().then(function(data){
		$scope.geoData = data.coords;
		console.log($scope.geoData);
		current = new Date().getTime();

		var params={api_key:"8e8b0a8d39a7af07485e7b992084a350",per_page:10,format:"json",nojsoncallback:1,sort:"interestingness-desc",min_upload_date:current/1e3-691200,method:"flickr.photos.search",text:getNeed(),lat:$scope.geoData.latitude,lon:$scope.geoData.longitude,radius:"3",content_type:"1",extras:"description, date_taken, geo, tags, views, media,path_alias, url_sq, url_z"};
		
    	$http({method: 'GET', url: "https://api.flickr.com/services/rest/", params: params}).
        success(function(data, status, headers, config) {
			$scope.result = data.photos.photo;
			$scope.loading = false;
			console.log(data);
	        $scope.result.forEach(function (photo) {
					var paramsFav={api_key:"8e8b0a8d39a7af07485e7b992084a350",photo_id:photo.id,format:"json",nojsoncallback:1,method:"flickr.photos.getFavorites",per_page:1};
			    	$http({method: 'GET', url: "https://api.flickr.com/services/rest/", params: paramsFav}).success(function(data, status, headers, config) {
						photo['users_rating'] = data.photo.total;
					});
	         });
        }).
        error(function(data, status, headers, config) {
			console.log('error get flickr');
         });
	});

});

app.directive('flickrs', function() {
		return {
			templateUrl: 'partials/see.html'
		};
	});
	
app.directive('login', function() {
		return {
			templateUrl: 'partials/login.html'
		};
	});
