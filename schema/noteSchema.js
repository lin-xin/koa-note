const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    folder: {
        type: Schema.Types.ObjectId,
        ref: 'folder'
    },
    type: {
        type: Number,
        default: 1
    },
    active: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    },
    share: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    updated_at: {
        type: Date,
        default: new Date()
    }
})

module.exports = noteSchema;