const express = require('express');
const { check } = require('express-validator');

const studentsControllers = require('../controllers/students-controllers');

const router = express.Router();

router.post('/signup',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('name').not().isEmpty(),
    check('firstname').not().isEmpty(),
    check('password').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
], studentsControllers.signup);

router.post('/login', studentsControllers.login);

router.get('/:school', studentsControllers.getStudents);

router.patch('/:sid', 
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    check('classyear').not().isEmpty(),
], studentsControllers.updateStudent);

router.delete('/:sid', studentsControllers.deleteStudent);

module.exports = router;