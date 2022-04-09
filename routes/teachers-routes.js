const express = require('express');
const { check } = require('express-validator');

const teachersControllers = require('../controllers/teachers-controllers');

const router = express.Router();

router.post('/signup',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['Grand-Hallet', 'Moxhe']),
], teachersControllers.signup);

router.post('/login', teachersControllers.login);

router.get('/:school', teachersControllers.getTeachers);

router.patch('/:tid',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('password').not().isEmpty(),
    check('role').isIn(['Default', 'Admin']),
], teachersControllers.updateTeacher);

router.delete('/:tid', teachersControllers.deleteTeacher);

module.exports = router;