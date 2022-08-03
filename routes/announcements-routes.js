const express = require('express');
const { check } = require('express-validator');

const annnouncementsControllers = require ('../controllers/announcements-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const router = express.Router();

router.get('/:school/target/:target', annnouncementsControllers.getAnnouncementByTarget);

router.get('/id/:aid', annnouncementsControllers.getAnnouncementById);

router.post('/',
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
    check('target').not().isEmpty(),
    check('target').isIn(['global', 'm0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6']),
    check('posteddate').not().isEmpty(),
], annnouncementsControllers.createAnnouncement);

router.patch('/:aid',
[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
], annnouncementsControllers.updateAnnouncement),

router.delete('/:aid', annnouncementsControllers.deleteAnnouncement);

module.exports = router;