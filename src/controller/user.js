/**
 * @description user controller
 */

const { getUserInfo,createUser } = require('../services/user')
const { SuccessModel,ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorInfo.js')
const doCrypto = require('../utils/cryp')

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

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别 （1 男，2 女， 3 保密）
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  } 

  // 注册 service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 
 * @param {*} password 
 */
async function login(ctx, userName, password) {
 
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo)
  }

  // 登陆成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }

  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login
}