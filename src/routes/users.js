const router = require('koa-static')();

router.prefix('/users');

router.get('/', function(ctx, next) {
  ctx.body = 'this is a users response!';
});

router.get('/bar', function(ctx, next) {
  ctx.body = 'this is a users/bar response';
});

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = {
    userName,
    password
  };
});

module.exports = router;
