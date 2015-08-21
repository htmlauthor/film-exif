angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

angular.module('starter.services', ['ionic', 'ionic.utils'])

.factory('Films', function($localstorage) {

    var starterFilms = [{
        id: 0,
        name: 'Kodak Gold',
        iso: 200,
        exposuresCount: 36,
        pictures: [
            {index: 1, name: 'Test exposure', aperture: 1.8, shutter: '1/125'},
            {index: 0, name: 'Black cat', aperture: 5.6, shutter: '1/60'},
            {index: 4, name: 'Green grass', aperture: 11, shutter: '1/125'},
            {index: 5, name: 'Red car', aperture: 7.1, shutter: '1/250'}
        ]
    }, {
        id: 1,
        name: 'Ilford super XP2',
        iso: 400,
        exposuresCount: 36,
        pictures: [
            {index: 0, name: 'Picture 1', aperture: 1.8, shutter: '1/125'},
            {index: 1, name: 'Picture 2', aperture: 5.6, shutter: '1/60'},
            {index: 2, name: 'Picture 3', aperture: 11, shutter: '1/125'},
            {index: 3, name: 'Picture 4', aperture: 7.1, shutter: '1/250'}
        ]
    }, {
        id: 2,
        name: 'FujiFilm Superia',
        iso: 200,
        exposuresCount: 24,
        pictures: [
            {index: 0, name: 'Picture 5', aperture: 1.8, shutter: '1/125'},
            {index: 1, name: 'Picture 6', aperture: 5.6, shutter: '1/60'},
            {index: 2, name: 'Picture 7', aperture: 11, shutter: '1/125'},
            {index: 3, name: 'Picture 8', aperture: 7.1, shutter: '1/250'}
        ]
    }];
    var films = $localstorage.getObject('films');
    if(!films.length){
        films = starterFilms;
    }

    $localstorage.setObject('films', films);

    var selectedFilm = $localstorage.get('selectedFilm') || 0;

    $localstorage.set('selectedFilm', selectedFilm);

    return {
        all: function() {
            return films;
        },
        remove: function(film, $scope) {
            $scope.Films.splice($scope.Films.indexOf(film), 1);

            $localstorage.setObject('films',$scope.Films);
        },
        get: function(filmId) {
            var films = this.all();
            for (var i = 0; i < films.length; i++) {
                if (films[i].id === parseInt(filmId)) {
                    return films[i];
                }
            }
            return null;
        },
        setSelected: function(filmId){
            $localstorage.set('selectedFilm', filmId);
        },
        getSelected: function(){
            var selectedFilm = $localstorage.get('selectedFilm');
            return this.get(selectedFilm);
        },
        removePicture: function(picture){
            var pics = this.getSelected().pictures;

            pics.splice(pics.indexOf(picture), 1);
        },
        addPicture: function(picture, $scope){
            this.getSelected().pictures.push(picture);

            $localstorage.setObject('films',films);
        },
        addFilm: function(film, $scope){
            var createNewFilm = function(filmInfo){
                return {
                    id: $scope.Films.length,
                    name: filmInfo.name,
                    iso: filmInfo.iso,
                    exposuresCount: filmInfo.exposuresCount,
                    pictures: []
                }
            }
            var newFilm = createNewFilm(film);
            $scope.Films.push(newFilm);

            $localstorage.setObject('films',$scope.Films);
        }
    };
});
