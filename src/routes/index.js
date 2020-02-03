const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
    isMe: true,
    blogList: [
      {
        id: 1,
        title: "aaa"
      },
      {
        id: 2,
        title: "bbb"
      },
      {
        id: 3,
        title: "ccc"
      }
    ]
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  // const session = ctx.session

  // if (session.viewNum == null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++  // viewNum: 7  刷新的次数

  ctx.body = {
    title: "koa2 json",
    // viewNum: session.viewNum
  };
});

router.get("/profile/:userName", async (ctx, next) => {
  const { userName } = ctx.params;

  // todo: ctx.params 获取动态路由的传值
  // ctx.request.query 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象
  console.log(ctx.params); //{ aid: '123', cid: '456' }

  ctx.body = {
    title: "this is profile page",
    userName
  };
});

router.get("/loadMore/:userName/:pageIndex", async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;

  ctx.body = {
    title: "this is loadMore API",
    userName,
    pageIndex
  };
});

module.exports = router;
