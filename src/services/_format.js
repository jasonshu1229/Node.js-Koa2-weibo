/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE } = require('../conf/constant')

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

module.exports = {
  formatUser
}