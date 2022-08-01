const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const outingSchema = new Schema({
    title: {type: String, required: true},
    school: {type: String, enum: ['grand-hallet', 'moxhe'] , required: true},
    target: {type: String,
    enum: ['m0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6' ], required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    file: {type: String, required: true},
})


module.exports = mongoose.model('Outing', outingSchema);