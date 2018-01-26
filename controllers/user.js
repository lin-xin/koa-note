const router = require('koa-router')(),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    userModel = require('../models/userModel.js');

class UserController{
    // 用户注册
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
    // 用户登录
    static async login(ctx) {
        const data = ctx.request.body;
        const result = await userModel.findOne({
            name: data.name,
            password: crypto.createHash('md5').update(data.password).digest('hex')
        })
        if(result !== null){
            const token = jwt.sign({
                name: result.name,
                _id: result._id
            }, 'note_token', { expiresIn: '8h' });
            ctx.body ={
                code: 200,
                msg: '登录成功',
                data: token
            }
        }else{
            ctx.body ={
                code: 404,
                msg: '登录失败',
                data: null
            }
        }
    }
    // 获取用户信息
    static async userinfo(ctx){
        const data = ctx.state.user;
        const user = await userModel.findById(data._id);
        if(user !== null){
            ctx.body ={
                code: 200,
                msg: '请求成功',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                }
            }
        }
    }
    // 更新用户头像
    static async avatar(ctx){
        const avatar = ctx.request.body.avatar;
        if(avatar === undefined || avatar === ''){
            return ctx.body = {
                code: 400,
                msg: '参数不合法',
                data: null
            }
        }
        const user = await userModel.findById(ctx.state.user._id);
        user.avatar = avatar;
        const result = await user.save();
        if(result !== null){
            ctx.body ={
                code: 200,
                msg: '请求成功',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                }
            }
        }
    }
}

module.exports = UserController;