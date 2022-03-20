const express = require('express');
const { check } = require('express-validator');

const newsControllers = require('../controllers/news-controllers');

const router = express.Router();

router.get('/', newsControllers.getNews);

router.post('/', newsControllers.createNews);

router.post('/',
[
    check('exemple1')
    .not()
    .isEmpty(),
    check('exemple2').isLength({min: 5}),
],
  newsControllers.createNews);


module.exports = router;