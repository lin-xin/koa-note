const folderModel = require('../models/folderModel.js');

class FolderController {

    // 创建文件夹
    static async create(ctx){
        const user = ctx.state.user,
            data = ctx.request.body;
        if(!data.title){
            return ctx.sendError(400, '参数不合法');
        }
        data.author = user._id;
        const folder = new folderModel(data);
        const result = await folder.save();
        return result !== null ? ctx.send(result) : ctx.sendError(400);
    }

    // 删除文件夹
    static async delete(ctx){
        const user = ctx.state.user,
            data = ctx.request.body;
        if(!data._id){
            return ctx.sendError(400, '参数不合法');
        }
        const folder = await folderModel.findById(data._id);
        if(folder === null){
            return ctx.sendError(404, '资源不存在');
        }
        if(user._id == folder.author){
            const result = await folder.remove();
            return result !== null ? ctx.send(result) : ctx.sendError(400);
        }else{
            return ctx.sendError(401, '没有权限');
        }
    }

    // 查找文件夹
    static async find(ctx){
        const user = ctx.state.user;
        const folder = await folderModel.find({author: user._id});
        return ctx.send(folder);
    }

    // 修改文件夹
    static async update(ctx){

    }
}

module.exports = FolderController;