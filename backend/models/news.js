const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema =  new Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: String, required: true},
    image: {type: String, required: true},
    school: {type: String, enum: ['grand-hallet', 'moxhe'] , required: true},
})

module.exports = mongoose.model('News', newsSchema);