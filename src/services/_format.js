/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
const { timeFormat } = require('../utils//dt')

 /**
  * 用户默认头像
  * @param {Object} obj 用户对象
  */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    // 替换默认头像
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list  用户列表或者单个用户信息
 */
function formatUser(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组 用户链表
    return list.map(_formatUserPicture)
  }

  // 单个对象
  return _formatUserPicture(list)
}

/**
 * 格式化数据的时间
 * @param {Object} obj 时间
 */
function _formatDBTime(obj) {
  // obj.createdAt sequlize数据库 自己建好的时间
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list  微博列表或者单个微博信息
 */
function formatBlog(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组 
    return list.map(_formatDBTime)
  }
  // 对象
  return _formatDBTime(list)
}

module.exports = {
  formatUser,
  formatBlog
}