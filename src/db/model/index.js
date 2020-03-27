/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User)
// Blog.belongsTo(User, {
//   foreignKey: 'userId'
// })

// 创建两个外键关系 对应到 User的 id上
UserRelation.belongsTo(User, {
  // 创建外键 UserRelation.followerId -> User.id
  foreignKey: 'followerId'
})

// 一对多(多对多)
// 创建外键 UserRelation.userId -> User.id
User.hasMany(UserRelation)


Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
})

module.exports = {
  User,
  Blog,
  UserRelation
}