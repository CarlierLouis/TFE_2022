const express = require('express');
const { check } = require('express-validator');

const trustedStudentsControllers = require('../controllers/trusted_students-controllers');

const router = express.Router();

router.get('/:school', trustedStudentsControllers.getTrustedStudents);

router.post('/',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('name').not().isEmpty(),
    check('firstname').not().isEmpty(),
    check('classyear').not().isEmpty(),
    check('school').not().isEmpty(),
], trustedStudentsControllers.createTrustedStudent);

router.patch('/:tsid',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('classyear').not().isEmpty(),
], trustedStudentsControllers.updateTrustedStudents);


router.delete('/:tsid', trustedStudentsControllers.deleteTrustedStudent);

module.exports = router;