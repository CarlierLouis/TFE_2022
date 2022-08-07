const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const annnouncementSchema = new Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    school: {type: String, enum: ['grand-hallet', 'moxhe'] , required: true},
    target: {type: String,
    enum: ['global', 'm0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6' ], required: true},
    posteddate: {type: Date, required: true},
    teacherid: {type: String, required: true}
})

module.exports = mongoose.model('Announcement', annnouncementSchema);