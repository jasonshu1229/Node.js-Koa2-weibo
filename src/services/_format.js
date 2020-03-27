/**
 * @description 数据格式化
 */

const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constant')
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
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content

  // 格式化 @
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a>你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`
    }
  )

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
    return list.map(_formatDBTime).map(_formatContent)
  }
  // 对象
  let result = list
  result = _formatDBTime(result)
  result = _formatContent(result) // @格式转换链接
  return result
}

module.exports = {
  formatUser,
  formatBlog
}