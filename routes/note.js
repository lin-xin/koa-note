const router = require('koa-router')(),
    Note = require('../controllers/note.js');

router.post('/create', Note.create);
router.put('/update', Note.update);

module.exports = router;