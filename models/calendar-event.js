const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
    title: {type: String, required: true},
    start: {type: String, required: true},
    end: {type: String, required: true},
    school: {type: String,enum: ['grand-hallet', 'moxhe'] , required: true},
    type: {type: String, default: 'global', require: true},
})

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema);