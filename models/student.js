const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema =  new Schema ({
    
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    status: { type: String, enum: ['Pending', 'Active'], default: 'Pending' },
    school: {type: String,enum: ['Grand-Hallet', 'Moxhe'] , required: true},
    classyear: {type: String, required: true},
    address: {type: String},
    phonenumber: {type: String},
    birdthdate: {type: Date}
    //confirmationCode : { type: String, unique: true },
})

module.exports = mongoose.model('Student', studentSchema);