const express = require('express');
const { check } = require('express-validator');

const trustedStudentsControllers = require('../controllers/trusted_students-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const xlsxUpload = require('../middleware/xlsx-upload')

const router = express.Router();

router.get('/:school', trustedStudentsControllers.getTrustedStudents);

router.get('/id/:tsid', trustedStudentsControllers.getTrustedStudentById);

router.use(checkAuthAdmin);

router.post('/',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('name').not().isEmpty(),
    check('firstname').not().isEmpty(),
    check('classyear').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
], trustedStudentsControllers.createTrustedStudent);

router.patch('/:tsid',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('classyear').not().isEmpty(),
], trustedStudentsControllers.updateTrustedStudent);

router.post('/add-xlsx',
xlsxUpload.single('xlsx'),
[
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe'])
], trustedStudentsControllers.createTrustedStudentsWithXLSX);



router.delete('/:tsid', trustedStudentsControllers.deleteTrustedStudent);

module.exports = router;