const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    school: {type: String, enum: ['grand-hallet', 'moxhe'] , required: true},
    target: {type: String, default: 'global', required: true},
})

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema);