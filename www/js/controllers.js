angular.module('starter.controllers', [])

.controller('PicturesCtrl', function($scope, Films) {
    $scope.$on('$ionicView.enter', function(e) {
        $scope.ActiveFilm = Films.getSelected();
    });

    $scope.showDelete = false;

    $scope.switchDeleteView = function(){
        $scope.showDelete = !$scope.showDelete;
    };

    $scope.remove = function(picture) {
        Films.removePicture(picture);
    };
})

.controller('FilmsCtrl', function($scope, Films) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.showDelete = false;

    $scope.Films = Films.all();

    $scope.remove = function(film) {
        Films.remove(film);
    };

    $scope.select = function(film){
        Films.setSelected(film.id);
    }

    $scope.switchDeleteView = function(){
        $scope.showDelete = !$scope.showDelete;
    }
});
