/**
 * @description 广场 API 路由
 * @author 双越老师
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const result = await getSquareBlogList(pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router
