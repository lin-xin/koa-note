const router = require('koa-router')(),
    User = require('../controllers/user.js');

router.post('/create', User.register);
router.post('/login', User.login);

module.exports = router;