/**
 * @description utils api 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

// 上传图片
const koaFrom = require('formidable-upload-koa')
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file']
  if (!file) {
    return
  }
  const { sieze, path, name, type } = file
  // controller
  ctx.body = await saveFile({
    name,
    type,
    sieze,
    filePath: path
  })
})

module.exports = router