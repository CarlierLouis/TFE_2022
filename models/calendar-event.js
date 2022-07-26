const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    school: {type: String, enum: ['grand-hallet', 'moxhe'], required: true},
    target: {type: String, default: 'global',
    enum: ['global', 'm0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6' ], required: true},
})

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema);