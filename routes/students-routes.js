const express = require('express');
const { check } = require('express-validator');

const studentsControllers = require('../controllers/students-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');
const checkAuthStudent = require('../middleware/check-auth-student');

const router = express.Router();

router.patch('/login/email-confirmation/:code', studentsControllers.verifyEmail);

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

router.get('/id/:sid', studentsControllers.getStudentById);

router.patch('/:sid', 
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    check('classyear').not().isEmpty(),
    check('classyear').isIn(['m0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'])
], studentsControllers.updateStudent);


router.delete('/:sid', studentsControllers.deleteStudent);

module.exports = router;