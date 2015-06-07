(function () {
    angular.module('angularReverseGeocode', [])
    .directive('reverseGeocode', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            link: function (scope, element, attrs) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
                geocoder.geocode({ 'latLng': latlng}, function (results, status) {					
					 // 'key': 'AIzaSyC9y_1xWyw2Iw5QYJ1RFsBKUPyfQo_uekY'
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            element.text(results[1].formatted_address);
							
                        } else {
                            element.text('Location not found');
                        }
                    } else {
                        // element.text('Geocoder failed due to: ' + status);
						element.text('-');
                    }
                });
            },
            replace: true
        }
    });
})();