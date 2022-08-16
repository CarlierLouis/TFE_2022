const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema =  new Schema ({
    
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    name: {type: String, required: true},
    firstname: {type: String, required: true},
    status: { type: String, enum: ['Pending', 'Active'], default: 'Pending' },
    school: {type: String,enum: ['grand-hallet', 'moxhe'] , required: true},
    classyear: {type: String,
    enum: ['m0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6' ], required: true},
    address: {type: String},
    phonenumber: {type: String},
    birdthdate: {type: Date},
    confirmationCode : { type: String, unique: true },
})

module.exports = mongoose.model('Student', studentSchema);