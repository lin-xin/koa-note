const koa = require('koa'),
    app = new koa(),
    router = require('koa-router')(),
    json = require('koa-json'),
    jwt = require('koa-jwt'),
    bodyparser = require('koa-bodyparser'),
    logger = require('koa-logger');

const db = require('./config/db.js'),
    errorHandle = require('./middlewares/errorHandle.js'),
    sendHandle = require('./middlewares/sendHandle.js');

const user = require('./routes/user.js'),
    folder = require('./routes/folder.js'),
    note = require('./routes/note.js');

app.use(json());
app.use(bodyparser());
app.use(logger());
app.use(sendHandle());
app.use(errorHandle);
app.use(jwt({
        secret: 'note_token'
    }).unless({
        path: [/\/user\/register/, /\/user\/login/]
    }));

router.use('/user', user.routes());
router.use('/folder', folder.routes());
router.use('/note', note.routes());
app.use(router.routes());

app.listen('3000', () => {
    console.log('koa is listening in 3000');
})