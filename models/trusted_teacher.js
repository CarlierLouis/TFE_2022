const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema =  new Schema ({
    
    email: {type: String, required: true},
    name: {type: String, required: true},
    firstname: {type: String, required: true},
    school: {type: String, required: true}
})

module.exports = mongoose.model('TrustedTeacher', newsSchema);