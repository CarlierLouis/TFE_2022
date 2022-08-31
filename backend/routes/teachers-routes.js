const express = require('express');
const { check } = require('express-validator');

const teachersControllers = require('../controllers/teachers-controllers');
const checkAuthUser = require('../middleware/check-auth-user');

const router = express.Router();

router.patch('/login/email-confirmation/:code', teachersControllers.verifyEmail);

router.patch('/email-password',
[ 
    check('email').isEmail(),
    check('email').not().isEmpty(),
], teachersControllers.sendNewPasswordEmail);

router.patch('/new-password/:code', 
[
    check('password').not().isEmpty(),
], teachersControllers.newPasswordConfirmation);

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

router.use(checkAuthUser);


router.get('/id/:tid', teachersControllers.getTeacherById);

router.patch('/:tid',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    check('role').isIn(['Default', 'Admin']),
    check('defaultclassyear').isIn(['m0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'])
], teachersControllers.updateTeacher);


router.delete('/:tid', teachersControllers.deleteTeacher);

module.exports = router;