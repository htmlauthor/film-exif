angular.module('starter.controllers', [])

.controller('PicturesCtrl', function($scope, $ionicModal, $ionicListDelegate, Films) {
    $scope.$on('$ionicView.enter', function(e) {
        $scope.ActiveFilm = Films.getSelected();
    });

    /****
    *   deleting
    ******/
    $scope.showDelete = false;

    $scope.switchDeleteView = function(){
        $scope.showDelete = !$scope.showDelete;
    };

    $scope.remove = function(picture) {
        Films.removePicture(picture);
    };

    /*******
    *   create new
    *******/
    // Open our new picture modal
    $scope.openNewPicture = function(){
        resetNewPicture();
        $scope.pictureModal.show();
    };
    // Close the new picture modal
    $scope.closeNewPicture = function() {
        $scope.pictureModal.hide();
    };

    var resetNewPicture = function() {
        $scope.newPicture = {
            index: '',
            name: '',
            aperture: '',
            shutter: ''
        };
    };

    $scope.createPicture = function(pic){
        Films.addPicture(pic, $scope);

        $scope.closeNewPicture();
    }

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('new-picture.html', function(modal) {
        $scope.pictureModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    /**********
    *   Edit picture
    ********/

    // Create and load the Modal
    $ionicModal.fromTemplateUrl('edit-picture.html', function(modal) {
        $scope.editPicModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });


    $scope.openEditPicture = function(picture){
        $scope.editedPicture = picture;
        $scope.editPicModal.show();
    };

    $scope.closeEditPicture = function() {
        $scope.editPicModal.hide();
        $ionicListDelegate.closeOptionButtons();
    };

    $scope.savePicture = function(picture){
        var pictures = Films.getSelected().pictures;
        var index = pictures.indexOf(picture);

        if (index !== -1) {
            pictures[index] = picture;
        }

        $scope.closeEditPicture();
    }
})

.controller('FilmsCtrl', function($scope, $ionicModal, $ionicListDelegate, Films) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.Films = Films.all();

    $scope.select = function(film){
        Films.setSelected(film.id);
    }

    /*****
    *   delete
    *******/

    $scope.showDelete = false;

    $scope.remove = function(film) {
        Films.remove(film, $scope);
    };

    $scope.switchDeleteView = function(){
        $scope.showDelete = !$scope.showDelete;
    };

    /*******
    *   create
    *******/

    $ionicModal.fromTemplateUrl('new-film.html', function(modal) {
        $scope.newFilmModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.openNewFilm = function(){
        resetNewFilm();
        $scope.newFilmModal.show();
    };
    $scope.closeNewFilm = function(){
        $scope.newFilmModal.hide();
    };

    $scope.createFilm = function(film){
        Films.addFilm(film, $scope);

        $scope.closeNewFilm();
    };

    function resetNewFilm(){
        $scope.newFilm = {
            id: null,
            name: '',
            iso: '',
            exposuresCount: ''
        };
    };

    /*******
    *   Edit
    ***********/
    $ionicModal.fromTemplateUrl('edit-film.html', function(modal) {
        $scope.editFilmModal = modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.openEditFilm = function(film){
        $scope.editedFilm = film;
        $scope.editFilmModal.show();
    };
    $scope.closeEditFilm = function(){
        $ionicListDelegate.closeOptionButtons();
        $scope.editFilmModal.hide();
    };

    $scope.saveFilm = function(editedFilm){
        var films = $scope.Films;
        var index = films.indexOf(editedFilm);

        if (index !== -1) {
            films[index] = editedFilm;
        }

        $scope.closeEditFilm();
    }

});
