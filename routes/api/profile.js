const express = require('express');

// Create custom router
const router = express.Router();

// Load Profile Model
const Profile = require('../../models/Profile');

// @route  GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

module.exports = router;