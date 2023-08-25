const express = require('express');
const authRoutes = require('../services/auth/authRoutes');
const userRoutes = require('../services/users/userRoutes');
const feedRoutes = require('../services/feeds/feedRoutes');


const router = express.Router();

// status
router.get('/', (req, res) => res.send('OKAY'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/feeds', feedRoutes);


module.exports = router;
