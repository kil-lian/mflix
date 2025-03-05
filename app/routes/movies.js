const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// 1. Nombre total de films
router.get('/count-movies', async (req, res) => {
  try {
    const count = await Movie.find({ type: 'movie' }).countDocuments();
    res.json({
      message: "Nombre total de films",
      count: count,
      query: "db.movies.countDocuments({ type: 'movie' })"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Nombre total de séries
router.get('/count-series', async (req, res) => {
  try {
    const count = await Movie.countDocuments({ type: 'series' });
    res.json({
      message: "Nombre total de séries",
      count: count,
      query: "db.movies.countDocuments({ type: 'series' })"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Types de contenu
router.get('/content-types', async (req, res) => {
  try {
    const types = await Movie.distinct('type');
    res.json({ types });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Liste des genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await Movie.distinct('genres');
    res.json({ genres });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Films depuis 2015
router.get('/movies-since-2015', async (req, res) => {
  try {
    const movies = await Movie.find({ year: { $gte: 2015 } })
      .sort({ year: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Films depuis 2015 avec 5+ récompenses
router.get('/awarded-movies', async (req, res) => {
  try {
    const count = await Movie.countDocuments({ 
      year: { $gte: 2015 }, 
      'awards.wins': { $gte: 5 } 
    });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Films depuis 2015 avec 5+ récompenses disponibles en français
router.get('/french-awarded-movies', async (req, res) => {
  try {
    const count = await Movie.countDocuments({ 
      year: { $gte: 2015 }, 
      'awards.wins': { $gte: 5 },
      languages: 'French'
    });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Films Thriller et Drama
router.get('/thriller-drama', async (req, res) => {
  try {
    const count = await Movie.countDocuments({ 
      genres: { $all: ['Thriller', 'Drama'] } 
    });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Titres et genres des films Crime ou Thriller
router.get('/crime-thriller', async (req, res) => {
  try {
    const movies = await Movie.find(
      { genres: { $in: ['Crime', 'Thriller'] } },
      { title: 1, genres: 1, _id: 0 }
    );
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Films en français et italien
router.get('/french-italian', async (req, res) => {
  try {
    const movies = await Movie.find(
      { languages: { $all: ['French', 'Italian'] } },
      { title: 1, languages: 1, _id: 0 }
    );
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. Films avec IMDB > 9
router.get('/high-rated', async (req, res) => {
  try {
    const movies = await Movie.find(
      { 'imdb.rating': { $gt: 9 } },
      { title: 1, genres: 1, _id: 0 }
    );
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 12. Films avec exactement 4 acteurs
router.get('/four-actors', async (req, res) => {
  try {
    const count = await Movie.countDocuments({ 
      'cast.3': { $exists: true },
      'cast.4': { $exists: false }
    });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
