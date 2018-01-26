const router = require('koa-router')(),
    User = require('../controllers/user.js');

router.post('/register', User.register);
router.post('/login', User.login);
router.get('/info', User.userinfo);
router.patch('/avatar', User.avatar);

module.exports = router;