const express = require('express');
const { check } = require('express-validator');

const calendarControllers =  require('../controllers/calendar-controlers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const router = express.Router();

router.get('/:school', calendarControllers.getEvents);

module.exports = router;