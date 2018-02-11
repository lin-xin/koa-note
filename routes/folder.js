const router = require('koa-router')(),
    Folder = require('../controllers/folder.js');

router.post('/create', Folder.create);
router.delete('/del', Folder.delete);
router.get('/all', Folder.find);

module.exports = router;