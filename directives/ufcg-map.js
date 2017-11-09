angular.module('map')
.directive('ufcgMap', function () {
    return {
        restrict : "E",
        template : "<div></div>",
        replace : true,
        link : function ($scope, $element) {
            var map;

            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
            });
        },
        controller : function () {
        }
    }
});