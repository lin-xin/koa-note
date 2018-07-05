const mongoose = require('mongoose');
const noteModel = require('../models/noteModel.js');
const folderModel = require('../models/folderModel.js');

class NoteController {
    static async create(ctx){
        const user = ctx.state.user,
            data = ctx.request.body;
        if(!mongoose.Types.ObjectId.isValid(data.folder)){
            return ctx.sendError(401, '参数不合法');
        }
        data.author = user._id;
        const result = await noteModel.create(data);
        if(result){
            const note = await noteModel.findById(result._id).populate('folder','title -_id').exec();
            ctx.send(note);
        }else{
            ctx.sendError(400);
        }
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

    // 查找文件夹下的笔记
    static async find(ctx){
        const data = ctx.request.body,
            user = ctx.state.user;
        if(!mongoose.Types.ObjectId.isValid(data.folder)){
            return ctx.sendError(401, '参数不合法');
        }
        const noteResult = await noteModel.find({folder: data.folder, author: user._id, active: 1}).populate('folder', 'title -_id').sort({'updated_at': -1}).exec();
        const folderResult = await folderModel.find({parent: data.folder}).sort({'updated_at': -1}).exec();
        return noteResult !== null ? ctx.send({data:noteResult,folders:folderResult}) : ctx.sendError(400);
    }

    // 查找全部笔记
    static async all(ctx){
        const user = ctx.state.user;
        const result = await noteModel.find({author: user._id, active: 1}).populate('folder', 'title -_id').sort({'updated_at': -1}).exec();
        return result !== null ? ctx.send(result) : ctx.sendError(400);
    }

    // 获取笔记详情
    static async detail(ctx){
        const id = ctx.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return ctx.sendError(401, '参数不合法');
        }
        const result = await noteModel.findById(id).populate('folder', 'title -_id').exec();
        return result !== null ? ctx.send(result) : ctx.sendError(400);
    }
}

module.exports = NoteController;