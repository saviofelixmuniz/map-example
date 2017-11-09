angular.module('map')
.config(function ($stateProvider) {
    var mapState = {
        name: 'map',
        url: '/map',
        templateUrl : '/templates/map.html',
        controller: 'MainCtrl'
    };

    $stateProvider.state(mapState);
});