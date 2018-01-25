const router = require('koa-router')(),
    crypto = require('crypto'),
    userModel = require('../models/userModel.js');

class UserController{
    static async register(ctx) {
        const data = ctx.request.body;
            
        const user = new userModel({
            name: data.name,
            password: crypto.createHash('md5').update(data.password).digest('hex'),
            email: data.email
        })
        const result = await user.save();
        if(result !== null){
            ctx.body = {
                code: 200,
                msg: '注册成功',
                data: result
            }
        }
    }
    static async login(ctx) {
        const data = ctx.request.body;
        const result = await userModel.findOne({
            name: data.name,
            password: crypto.createHash('md5').update(data.password).digest('hex')
        })
        if(result !== null){
            ctx.body ={
                code: 200,
                msg: '登录成功',
                data: result
            }
        }else{
            ctx.body ={
                code: 404,
                msg: '登录失败'
            }
        }
    }
}

module.exports = UserController;