const express = require('express');
const { check } = require('express-validator');

const trustedStudentsControllers = require('../controllers/trusted_students-controllers');
const checkAuthUser = require('../middleware/check-auth-user');

const xlsxUpload = require('../middleware/xlsx-upload')

const router = express.Router();

router.use(checkAuthUser);

router.get('/:school', trustedStudentsControllers.getTrustedStudents);

router.get('/id/:tsid', trustedStudentsControllers.getTrustedStudentById);

router.post('/',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('name').not().isEmpty(),
    check('firstname').not().isEmpty(),
    check('classyear').not().isEmpty(),
    check('classyear').isIn(['m0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6']),
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
    check('school').isIn(['grand-hallet', 'moxhe']),
], trustedStudentsControllers.createTrustedStudentsWithXLSX);



router.delete('/:tsid', trustedStudentsControllers.deleteTrustedStudent);

module.exports = router;