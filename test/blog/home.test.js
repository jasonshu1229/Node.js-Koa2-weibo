/**
 * @description 首页 tesst
 */
const server = require('../server')
const { Z_COOKIE } = require('../testUserInfo')

// 存储微博 id （为了标识）
let BLOG_ID = ''

test('创建一条微博，应该成功', async () => {
  // 定义测试内容
  const content = '单元测试自动创建的微博_' + Date.now()
  const image = '/xxx.png'

  // 开始测试
  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', Z_COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  // 记录 微博 id
  BLOG_ID = res.body.data.id
})