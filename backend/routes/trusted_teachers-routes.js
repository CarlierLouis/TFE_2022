const express = require('express');
const { check } = require('express-validator');

const trustedTeachersControllers = require('../controllers/trusted_teachers-controllers');
const checkAuthUser = require('../middleware/check-auth-user');

const router = express.Router();


router.use(checkAuthUser);

router.get('/:school', trustedTeachersControllers.getTrustedTeachers);

router.get('/id/:ttid', trustedTeachersControllers.getTrustedTeacherById);

router.post('/',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
    check('name').not().isEmpty(),
    check('firstname').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
], trustedTeachersControllers.createTrustedTeacher);

router.patch('/:ttid',
[
    check('email').isEmail(),
    check('email').not().isEmpty(),
], trustedTeachersControllers.updateTrustedTeacher);


router.delete('/:ttid', trustedTeachersControllers.deleteTrustedTeacher);

module.exports = router;