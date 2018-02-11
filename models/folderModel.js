const mongoose = require('mongoose'),
    folderSchema = require('../schema/folderSchema.js');

module.exports = mongoose.model('folder', folderSchema);