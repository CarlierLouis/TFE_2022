const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema =  new Schema ({
    
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 6},
    name: {type: String, required: true},
    firstname: {type: String, required: true},
    status: { type: String, enum: ['Pending', 'Active'], default: 'Pending' },
    school: {type: String,enum: ['grand-hallet', 'moxhe'] , required: true},
    role: {type: String, enum: ['Admin', 'Default'], default: 'Default', require: true},
    confirmationCode: { type: String, unique: true },
})

module.exports = mongoose.model('Teacher', teacherSchema);