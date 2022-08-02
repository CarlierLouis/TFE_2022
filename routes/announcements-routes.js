const express = require('express');
const { check } = require('express-validator');

const annnoucementsControllers = require ('../controllers/announcements-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const router = express.Router();

router.get('/:school/target/:target', annnoucementsControllers.getAnnouncementByTarget);

router.get('/id/:aid', annnoucementsControllers.getAnnouncementById);

router.post('/',
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('school').not().isEmpty(),
    check('posteddate').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
    check('target').not().isEmpty(),
    check('target').isIn(['global', 'm0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'])
], annnoucementsControllers.createAnnouncement);

router.patch('/:aid',
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
], annnoucementsControllers.updateAnnouncement),

router.delete('/:aid', annnoucementsControllers.deleteAnnouncement);

module.exports = router;