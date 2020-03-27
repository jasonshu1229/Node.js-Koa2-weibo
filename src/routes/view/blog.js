/**
 * @description 微博 view 路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getHomeBlogList } = require('../../controller/blog-home')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo

  // 获取第一页数据
  // controller
  const result = await getHomeBlogList(userId)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  const fansResult = await getFans(userId)
  const { count: fansCount, fansList } = fansResult.data

  // 获取关注人列表
  const followersResult = await getFollowers(userId)
  const { count: followersCount, followersList } = followersResult.data

  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      // atCount
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
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

  // 获取粉丝
  // controller
  const fansResult = await getFans(curUserInfo.id)
  const { count: fansCount, fansList} = fansResult.data

  // 获取关注人列表 
  // controller
  const followersResult = await getFollowers(curUserInfo.id)
  const { count: followersCount, followersList} = followersResult.data

  // 我是否关注了此人
  const amIFollowed = fansList.some(item => {
    // 从当前粉丝列表中 查找 是否有自己（已登录用户）关注的
    return item.userName === myUserName
  })

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
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      amIFollowed
    }
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

  await ctx.render('square', {
      blogData: {
          isEmpty,
          blogList,
          pageSize,
          pageIndex,
          count
      }
  })
})

module.exports = router