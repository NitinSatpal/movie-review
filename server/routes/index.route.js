const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const movieRoutes = require('./movie.route');
const reviewRoutes = require('./review.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/movie', movieRoutes);
router.use('/review', reviewRoutes);

module.exports = router;
