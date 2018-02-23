const router = require('koa-router')(),
    Note = require('../controllers/note.js');

router.post('/create', Note.create);

module.exports = router;