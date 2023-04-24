const express = require('express');
const router = express.Router();
// router object created from express.Router
const indexController = require('../controllers/index');
// requiring controller functionality from index controller module

router.get('/index', indexController.home);
// set up home route and map requests to home controller function

module.exports = router;
// export router object