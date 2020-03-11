/**
 * @description json schema 验证 中间件
 */

const { ErrorModel }  = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')

/**
 * 生成json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
  // 定义中间件函数
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)
    if (error) {
      // 验证失败哦
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
      return
    }
    // 验证成功，继续注册流程
    await next()
  }
  //返回中间件
  return validator 
}

module.exports = {
  genValidator
}