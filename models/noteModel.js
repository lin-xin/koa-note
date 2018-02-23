const mongoose = require('mongoose'),
    noteSchema = require('../schema/noteSchema.js');

module.exports = mongoose.model('note', noteSchema);