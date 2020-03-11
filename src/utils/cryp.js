/**
 * @description 加密方法
 */

// Nodejs中自带的加密方式
const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * 
 * @param {string} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  // 十六进制
  return md5.update(content).digest('hex')
}

/**
 * 
 * @param {string} content  明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto