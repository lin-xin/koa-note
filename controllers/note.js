const mongoose = require('mongoose'),
    noteModel = require('../models/noteModel.js');

class NoteController {
    static async create(ctx){
        const user = ctx.state.user,
            data = ctx.request.body;
        if(!mongoose.Types.ObjectId.isValid(data.folder)){
            return ctx.sendError(401, '参数不合法');
        }
        data.author = user._id;
        const result = await noteModel.create(data);
        return result !== null ? ctx.send(result) : ctx.sendError(400);
    }

    static async delete(ctx){
        const user = ctx.state.user,
            data = ctx.request.body;
        if(!mongoose.Types.ObjectId.isValid(data._id)){
            return ctx.sendError(401, '参数不合法');
        }
        let note = await noteModel.findById(data._id);
        if(note === null || note.active === 2){
            return ctx.sendError(404, '资源不存在');
        }
        if(note.author == user._id){
            note.active = 2;
            const result = await note.save();
            return result !== null ? ctx.send(null, '删除成功') : ctx.sendError(400);
        }else{
            return ctx.sendError(401, '没有权限');
        }
    }

    static async update(ctx){
        const data = ctx.request.body;
        if(!mongoose.Types.ObjectId.isValid(data._id)){
            return ctx.sendError(401, '参数不合法');
        }
        const result = await noteModel.findByIdAndUpdate(data._id, data, {new: true});
        return result !== null ? ctx.send(result) : ctx.sendError(400);
    }
}

module.exports = NoteController;