/**
 * @description 微博缓存层
 */

const { get, set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

  // 尝试获取缓存
  const cacheResult = await get(key) 
  // 获取缓存成功
  if (cacheResult !== null) {
    return cacheResult
  }

  // 没有缓存，则读取数据库 （1、长时间没有访问，导致缓存过期；2、第一次登陆访问，还没来得及缓存）
  const result = await getBlogListByUser({ pageIndex, pageIndex })

  // 设置缓存，过期时间 1min
  set(key, result, 60)

  return result
}

module.exports = {
  getSquareCacheList
}