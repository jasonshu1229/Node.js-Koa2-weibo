/**
 * @description 微博数据模型
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../type.js')

const Blog = seq.define('blog', {
  // userId: {
  //   type: INTEGER,
  //   allowNull: false,
  //   commit: '用户 ID'
  // },
  content: {
    type: TEXT,
    allowNull: false,
    content: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})

module.exports = Blog