const express = require('express');
const { check } = require('express-validator');

const newsControllers = require('../controllers/news-controllers');

const router = express.Router();

router.get('/', newsControllers.getNews);

router.post('/', newsControllers.createNews);

// Exemple de la "validité des infos" avec express-validator (sur la méthode post ici)
// Voir doc pour plus de cas
/* 
router.post('/',
[
    check('exemple1')
    .not()
    .isEmpty(),
    check('exemple2').isLength({min: 5}),
]
  newsControllers.createNews);
*/


module.exports = router;