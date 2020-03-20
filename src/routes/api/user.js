/**
 * @description user API 路由
 */

const router = require('koa-router')()
const { 
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo 
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// 注册路由
router.post('/register', genValidator(userValidate) ,async (ctx, next) => {
  // 再注册
  const { userName, password, gender } = ctx.request.body
  // 调用 controller
  ctx.body = await register({ 
    userName, 
    password, 
    gender 
  })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // controller
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下，测试账号登陆之后，删除自己
    const { userName } = ctx.session.userInfo
    // 调用controller
    ctx.body = await deleteCurUser(userName)
  }
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  // controller
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

module.exports = router