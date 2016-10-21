var express = require('express');
var router = express.Router();
var API = require('../API/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/sign-up', function(req, res, next) {
  res.render('sign-up');
});

router.get('/pet-selection',API.authenticate, function(req, res, next) {
  res.render('pet-selection');
});

router.get('/pet-shop', function(req, res, next) {
  res.render('pet-shop');
});

router.get('/logout',API.logout);

router.post('/addusr',API.addusr);
router.post('/login',API.login);

module.exports = router;

