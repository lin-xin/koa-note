const router = require('koa-router')(),
    Note = require('../controllers/note.js');

router.post('/create', Note.create);
router.put('/update', Note.update);
router.post('/find', Note.find);
router.get('/all', Note.all);

module.exports = router;