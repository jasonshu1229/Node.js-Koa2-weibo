/**
 * @description user model test
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性，符合预期', () => {
  const user = User.build({
    // build 会构建一个内存的 User 实例，但不会提交到数据库中
    userName: 'zhangsan',
    password: '222sda',
    nickName: '张三',
    picture: '/xxx.png',
    city: '北京'
  })
  // 验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('222sda')
  expect(user.gender).toBe(3)
  expect(user.nickName).toBe('张三')
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('北京')
})