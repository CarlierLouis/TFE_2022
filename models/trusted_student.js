const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trustedStudentSchema =  new Schema ({
    
    email: {type: String, required: true},
    name: {type: String, required: true},
    firstname: {type: String, required: true},
    classyear: {type: String,
    enum: ['global', 'm0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6' ], required: true},
    school: {type: String, enum: ['grand-hallet', 'moxhe'] , required: true},
})

module.exports = mongoose.model('TrustedStudent', trustedStudentSchema);