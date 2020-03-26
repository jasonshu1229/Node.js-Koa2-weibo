/**
 * @description 用户关系 controller
 */

const { getUserByFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

 /**
  * 根据 userID 获取粉丝列表
  * @param {number} userId 用户 id
  */
async function getFans(userId) {
  // service
  const { count, userList } = await getUserByFollower(userId)

  // 返回
  return new SuccessModel({
    count,
    fansList: userList
  })
}

module.exports = {
  getFans
}