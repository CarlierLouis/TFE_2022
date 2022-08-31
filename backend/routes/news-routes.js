const express = require('express');
const { check } = require('express-validator');

const newsControllers = require('../controllers/news-controllers');
const checkAuthUser = require('../middleware/check-auth-user');

const imageUpload = require('../middleware/image-upload');

const router = express.Router();

router.get('/:school', newsControllers.getNews);

router.use(checkAuthUser);

router.get('/id/:nid', newsControllers.getNewsById);

router.post('/',
imageUpload.single('image'),
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('date').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
], newsControllers.createNews);

router.patch('/:nid', 
imageUpload.single('image'),
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('date').not().isEmpty(),
], newsControllers.updateNews);

router.delete('/:nid', newsControllers.deleteNews);

module.exports = router;