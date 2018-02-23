const mongoose = require('mongoose'),
    noteModel = require('../models/noteModel.js');

class NoteController {
    static async create(ctx){
        const user = ctx.state.user,
            data = ctx.request.body;
        data.author = user._id;
        const result = await noteModel.create(data);
        return ctx.send(result);
    }
}

module.exports = NoteController;