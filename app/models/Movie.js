const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    type: String,
    title: String,
    genres: [String],
    year: Number,
    languages: [String],
    awards: {
        wins: Number,
        nominations: Number,
    },
    imdb: {
        rating: Number
    },
    cast: [String]
}, { 
    collection: 'movies',
    strict: false 
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
