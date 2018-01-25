const koa = require('koa'),
    app = new koa(),
    router = require('koa-router')(),
    json = require('koa-json'),
    bodyparser = require('koa-bodyparser'),
    logger = require('koa-logger'),
    db = require('./config/db.js');

const user = require('./routes/user.js');

app.use(json());
app.use(bodyparser());
app.use(logger());

router.use('/user', user.routes());
app.use(router.routes());

app.listen('3000', () => {
    console.log('koa is listening in 3000');
})