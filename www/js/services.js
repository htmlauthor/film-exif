angular.module('starter.services', [])

.factory('Films', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var films = [{
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

    var selectedFilm = 0;

    return {
        all: function() {
            return films;
        },
        remove: function(film) {
            films.splice(films.indexOf(film), 1);
        },
        get: function(filmId) {
            for (var i = 0; i < films.length; i++) {
                if (films[i].id === parseInt(filmId)) {
                    return films[i];
                }
            }
            return null;
        },
        setSelected: function(filmId){
            selectedFilm = filmId;
        },
        getSelected: function(){
            return this.get(selectedFilm);
        },
        removePicture: function(picture){
            var pics = this.getSelected().pictures;

            pics.splice(pics.indexOf(picture), 1);
        },
        addPicture: function(picture){
            var pics = this.getSelected().pictures;

            pics.push(picture);
        },
        addFilm: function(film){
            films.push(film);
        }
    };
});
