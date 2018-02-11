const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new mongoose.Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'folder'
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

module.exports = folderSchema;