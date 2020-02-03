/**
 * @description test demo
 * @author 书豪
 */

 function sum(a, b) {
   return a+b
 }

 test('sum verify ', () => {
   const res = sum(10, 20)
   expect(res).toBe(30)
 })
 