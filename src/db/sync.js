/**
 * @description sequelize 同步数据库
 * @author 书豪
 */
const seq = require('./seq');

// require('./model');

// 测试连接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth error',err)
});

// 执行同步
// force: true 表示 如果数据库 已经存在该数据表，会删掉重新建
seq.sync({ force: true}).then(() => {
  console.log('sync ok')
  process.exit();
});