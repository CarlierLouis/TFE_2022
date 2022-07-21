const express = require('express');
const { check } = require('express-validator');

const teachersControllers = require('../controllers/teachers-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');
const checkAuthTeacher = require('../middleware/check-auth-teacher');

const router = express.Router();

router.patch('/login/email-confirmation/:code', teachersControllers.verifyEmail);

router.post('/signup',
[   
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('name').not().isEmpty(),
    check('firstname').not().isEmpty(),
    check('password').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
], teachersControllers.signup);

router.post('/login', teachersControllers.login);

router.get('/:school', teachersControllers.getTeachers);

router.get('/id/:tid', teachersControllers.getTeacherById);

router.patch('/:tid',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    check('role').isIn(['Default', 'Admin']),
], teachersControllers.updateTeacher);


router.delete('/:tid', teachersControllers.deleteTeacher);

module.exports = router;