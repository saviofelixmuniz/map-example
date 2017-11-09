angular.module('map')
.controller('MainCtrl', function ($scope, NgMap) {
    var map = undefined;
    NgMap.getMap().then(function(mapResult) {
        console.log(mapResult.getCenter());
        console.log('markers', mapResult.markers);
        console.log('shapes', mapResult.shapes);
        map = mapResult;
    });

    $scope.ufcgCords = [
        {lat: -7.211582063794847, lng: -35.908427238464355},
        {lat: -7.211954602379666, lng: -35.90901732444763},
        {lat: -7.21215683748306, lng: -35.90925335884094},
        {lat: -7.212603883180555, lng: -35.9093177318573},
        {lat: -7.213178655571561, lng: -35.9093177318573},
        {lat: -7.213561836760166, lng: -35.909414291381836,},
        {lat: -7.213998237163229, lng: -35.90957522392273},
        {lat: -7.21434948596254, lng: -35.90980052947998},
        {lat: -7.214604939463547, lng: -35.91011166572571},
        {lat: -7.2147965294947145, lng: -35.9103262424469},
        {lat: -7.214988119444751, lng: -35.910712480545044},
        {lat: -7.2152116409506375, lng: -35.91112017631531},
        {lat: -7.2153819429762605, lng: -35.911463499069214},
        {lat: -7.21560546428765, lng: -35.911903381347656},
        {lat: -7.215818341624408, lng: -35.91227889060974},
        {lat: -7.216105725870212, lng: -35.91256856918335},
        {lat: -7.216414397634615, lng: -35.912686586380005},
        {lat: -7.2166485622809615, lng: -35.912718772888184},
        {lat: -7.21695723367506, lng: -35.91247200965881},
        {lat: -7.21697852134966, lng: -35.912150144577026},
        {lat: -7.217106247376168, lng: -35.91150641441345},
        {lat: -7.21718075420832, lng: -35.910948514938354},
        {lat: -7.21722332953546, lng: -35.91048717498779},
        {lat: -7.217329767835804, lng: -35.91002583503723},
        {lat: -7.217340411664459, lng: -35.90956449508667},
        {lat: -7.217382986976575, lng: -35.90938210487366},
        {lat: -7.217265904858604, lng: -35.90904951095581},
        {lat: -7.217106247376168, lng: -35.908459424972534},
        {lat: -7.21697852134966, lng: -35.907922983169556},
        {lat: -7.216776288400609, lng: -35.907440185546875},
        {lat: -7.216637918436021, lng: -35.906914472579956},
        {lat: -7.216542123820367, lng: -35.90656042098999},
        {lat: -7.216414397634615, lng: -35.90588450431824},
        {lat: -7.216371822231359, lng: -35.90559482574463},
        {lat: -7.215541601067087, lng: -35.90563774108887},
        {lat: -7.214924256137079, lng: -35.905680656433105},
        {lat: -7.21348732933222, lng: -35.905659198760986},
        {lat: -7.212359072496125, lng: -35.905669927597046},
        {lat: -7.212061041919028, lng: -35.90564846992493},
        {lat: -7.211880094687213, lng: -35.905702114105225},
        {lat: -7.211603351722236, lng: -35.90587377548218},
        {lat: -7.211401116371638, lng: -35.90612053871155},
        {lat: -7.211284032706316, lng: -35.906431674957275},
        {lat: -7.211262744763913, lng: -35.906742811203},
        {lat: -7.211198880930712, lng: -35.907193422317505},
        {lat: -7.211188236957634, lng: -35.90764403343201}
    ];

    var ufcgPolygon = new google.maps.Polygon({paths: $scope.ufcgCords});

    $scope.setCenter = function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        var contentString = '<h1>' + $scope.title + '</h1>' +
                            '<p>' + $scope.description + '</p>' +
                            '<img src="' + $scope.image + '" style="height: 100px; width : auto" alt="">';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        if (!google.maps.geometry.poly.containsLocation(event.latLng, ufcgPolygon)) {
            alert("outside ufcg!");
        }
        else {
            console.log("okok");
            var marker = new google.maps.Marker();
            marker.setMap(map);
            marker.setPosition(event.latLng);
            marker.setTitle("clique");

            if ($scope.icon) {
                if ($scope.icon[0] === ">")
                    marker.setIcon($scope.icon.split(">")[1]);
                else {
                    marker.setIcon('http://maps.google.com/mapfiles/ms/micons/' + $scope.icon + '.png');
                }
            }

            // icon: {
            //     path: google.maps.SymbolPath.CIRCLE,
            //         fillColor: resultColor,
            //         fillOpacity: .2,
            //         strokeColor: 'white',
            //         strokeWeight: .5,
            //         scale: 10
            // }
        }

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    };

    $scope.goToMyLocation = function () {
        console.log($scope.restriction);;

        if (navigator.geolocation) {
            console.log("okok");
            navigator.geolocation.getCurrentPosition(function(position) {
                var posFun = {
                    lat: function () { return position.coords.latitude },
                    lng: function () { return position.coords.longitude}
                };

                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                console.log(pos);

                if ($scope.restriction) {
                    if (!google.maps.geometry.poly.containsLocation(posFun, ufcgPolygon)) {
                        alert("Você não está na ufcg");
                    }
                    else {
                        map.setCenter(pos);

                        var marker = new google.maps.Marker();
                        marker.setMap(map);
                        marker.setPosition(pos);
                    }
                }

                else {
                    map.setCenter(pos);

                    var marker = new google.maps.Marker();
                    marker.setMap(map);
                    marker.setPosition(pos);
                }
            });
        }




    };
    
    $scope.dragEnd = function (event) {
        if(!google.maps.geometry.poly.containsLocation(map.getCenter(), ufcgPolygon))
            map.setCenter({lat : -7.214250, lng : -35.909188});
    };

    $scope.dragStart = function (event) {
    };
});


