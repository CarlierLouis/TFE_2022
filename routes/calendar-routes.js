const express = require('express');
const { check } = require('express-validator');

const calendarControllers =  require('../controllers/calendar-controlers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const router = express.Router();

router.get('/:school', calendarControllers.getEvents);

router.get('/id/:eid', calendarControllers.getEventById);

router.use(checkAuthAdmin);

router.post('/',
[
    check('title').not().isEmpty(),
    check('start').not().isEmpty(),
    check('end').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
    check('type').not().isEmpty(),
], calendarControllers.createEvent);

router.patch('/:eid', 
[
    check('title').not().isEmpty(),
    check('start').not().isEmpty(),
    check('end').not().isEmpty(),
], calendarControllers.updateEvent);

router.delete('/:nid', calendarControllers.deleteEvent);

module.exports = router;