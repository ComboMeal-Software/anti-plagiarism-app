var express = require('express');
var router = express.Router();

const appController = require('../controllers/appController');

/* GET home page. */
router.get('/', appController.homePage);
router.post('/', appController.homePageResult);

module.exports = router;
