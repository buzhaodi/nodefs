const Koa = require('koa');
const webpack = require('webpack'); // webpack模块
const router = require('koa-router')()
const config = require('../build/webpack.dev.conf'); // 开发环境模块
let compiler;
// 中间件容器，把webpack处理后的文件传递给一个服务器
const devMiddleware = require('./middleware/devMiddleware');
// 在内存中编译的插件，不写入磁盘来提高性能
// const hotMiddleware = require('./middleware/hotMiddleware');
const app = new Koa();




router.get('/home', async (ctx, next) => {
    ctx.response.body = '<h1>HOME page</h1>'
})

router.get('/404', async (ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>'
})

 // 调用路由中间件
 app.use(router.routes())






config.then(function(s){//既然导出的是promise，那就用相应的方式来处理就好了
  compiler = webpack(s)
  app.use(devMiddleware(compiler));
  app.listen(3000);
});
