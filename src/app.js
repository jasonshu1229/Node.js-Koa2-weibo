const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')
let { isProd } = require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 路由
const profileAPIRouter = require('./routes/api/blog-profile')
const homeAPIRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const utilsAPIRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error' // 遇到错误时跳转到该路由
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// todo session配置
app.keys = [SESSION_SECRET_KEY]  // 加密(密室)
app.use(session({
  key: 'weibo.sid',  // cookie name  默认是  `koa.sid`
  prefix: 'weibo:sess:',  // redis key 的前缀，默认是 `koa:sess`
  cookie: {
    path: '/',
    httpOnly: true,  // 只允许服务端修改cookie的值
    maxAge: 24 * 60 * 60 * 1000 // ms koa-redis 只要设置了cookie的过期时间，redis中的ttl过期时间则会自动设置
  },
  // 将 session中的信息存储在redis中
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
