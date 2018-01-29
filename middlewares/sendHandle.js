const sendHandle = () => {
    const render = ctx => {
        return (data, msg) => {
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code: 200,
                data: data,
                msg: msg || '请求成功'
            }
        }
    }

    const renderError = ctx => {
        return (code, msg) => {
            ctx.set('Content-Type', 'application/json');
            ctx.body = {
                code: code,
                data: null,
                msg: msg || '请求失败'
            }
        }
    }

    return async (ctx, next) => {
        ctx.send = render(ctx);
        ctx.sendError = renderError(ctx);
        await next();
    }
}

module.exports = sendHandle;