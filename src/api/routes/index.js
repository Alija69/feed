const express = require('express');
// const authRoutes = require('../../services/auth/auth.route');
const userRoutes = require('../services/users/userRoutes');
const feedRoutes = require('../services/feeds/feedRoutes');


const router = express.Router();

// status
router.get('/', (req, res) => res.send('OKAY'));

router.use('/users', userRoutes);
router.use('/feeds', feedRoutes);
// router.use('/posts', postsRoutes);
// router.use('/geo', geoRoutes);

module.exports = router;
