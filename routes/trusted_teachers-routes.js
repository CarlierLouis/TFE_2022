const express = require('express');
const { check } = require('express-validator');

const trustedTeachersControllers = require('../controllers/trusted_teachers-controllers');

const router = express.Router();

router.get('/:school', trustedTeachersControllers.getTrustedTeachers);

router.post('/',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('name').not().isEmpty(),
    check('firstname').not().isEmpty(),
    check('school').not().isEmpty(),
], trustedTeachersControllers.createTrustedTeacher);

router.patch('/:tsid',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
], trustedTeachersControllers.updateTrustedTeacher);


router.delete('/:tsid', trustedTeachersControllers.deleteTrustedTeacher);

module.exports = router;