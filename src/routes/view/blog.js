/**
 * @description 微博 view 路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {

  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if (isMe) {
    // 当前已登录用户是自己
    curUserInfo = myUserInfo  // 从session取的用户信息
  } else {
    // 当前查看的用户信息 不是自己(不是当前登录用户)，而是数据库里已经有的用户信息
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) { 
      // 用户名不存在
      return // 返回404
    } 
    // 用户名存在 （数据库里的）
    curUserInfo = existResult.data // 从数据库里取出的用户信息
  }

  // 获取微博第一页数据
  // controller
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe
    }
  })
})

module.exports = router