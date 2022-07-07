const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const CalendarEvent =  require('../models/calendar-event');

// Get all events from global calendar by school
const getEvents = async (req, res, next) => {
    const school =  req.params.school;

    let events;
    try {
        events = await CalendarEvent.find({school: school})
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération du calendrier, veillez réessayer', 500);
        return next(error);
    }

    if(!events) {
        const error = new HttpError(
            'Impossible de trouver des actualités pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ events: events.map(events => events.toObject({ getters: true })) });
}

exports.getEvents = getEvents;


