/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel,ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo
} = require('../model/ErrorInfo.js')

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist (userName) {
  // 业务逻辑处理
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // { errno: 0, data: {...} }
    return new SuccessModel(userInfo)
  } else {
    // { errno: 10003, message:'用户名未存在' }
    return new ErrorModel(registerUserNameNotExistInfo)
  }
  // 调用services层 获取数据
  // 统一返回格式
}

module.exports = {
  isExist
}