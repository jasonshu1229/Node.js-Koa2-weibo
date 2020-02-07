/**
 * error 404 路由
 * @author 书豪
 */ 

const router = require('koa-router')()

router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

//404
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
