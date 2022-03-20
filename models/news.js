const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsSchema =  new Schema ({
    
    exemple1: {type: String, required: true},
    exemple2: {type: String, required: true}
})

module.exports = mongoose.model('News', newsSchema);