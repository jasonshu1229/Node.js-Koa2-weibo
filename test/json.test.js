/**
 * @description json server
 * @author 书豪
 */ 

 const server =  require('./server')

 test('json 接口返回数据格式正确', async () => {
   const res = await server.get('/json')
   expect(res.body).toEqual({  // 判断返回的对象是否相等
    title: 'koa2 json'
   })

   expect(res.body.title).toBe('koa2 json')
 })
  