const express = require('express');
const { check } = require('express-validator');

const calendarControllers =  require('../controllers/calendar-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const router = express.Router();

router.get('/:school', calendarControllers.getGlobalEvents);

router.get('/:school/target/:target', calendarControllers.getEventsByTarget);

router.get('/id/:eid', calendarControllers.getEventById);

router.use(checkAuthAdmin);

router.post('/',
[
    check('title').not().isEmpty(),
    check('start').not().isEmpty(),
    check('end').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
    check('target').not().isEmpty(),
    check('target').isIn(['global', 'm0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'])
], calendarControllers.createEvent);

router.patch('/:eid', 
[
    check('title').not().isEmpty(),
    check('start').not().isEmpty(),
    check('end').not().isEmpty(),
], calendarControllers.updateEvent);

router.delete('/:eid', calendarControllers.deleteEvent);

module.exports = router;