const express = require('express');
const { check } = require('express-validator');

const newsControllers = require('../controllers/news-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/:school', newsControllers.getNews);

router.get('/id/:nid', newsControllers.getNewsById);

router.use(checkAuthAdmin);

router.post('/',
fileUpload.single('image'),
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('date').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
], newsControllers.createNews);

router.patch('/:nid', 
fileUpload.single('image'),
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('date').not().isEmpty(),
], newsControllers.updateNews);

router.delete('/:nid', newsControllers.deleteNews);

module.exports = router;