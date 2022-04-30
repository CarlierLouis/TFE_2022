const express = require('express');
const { check } = require('express-validator');

const newsControllers = require('../controllers/news-controllers');
const checkAuthTeacher = require('../middleware/check-auth-teacher');
const checkAuthStudent = require('../middleware/check-auth-student');

const router = express.Router();

router.use(checkAuthTeacher);

router.get('/:school', newsControllers.getNews);

router.post('/',
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('image').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
], newsControllers.createNews);

router.patch('/:nid', 
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('image').not().isEmpty(),
], newsControllers.updateNews);

router.delete('/:nid', newsControllers.deleteNews);

module.exports = router;