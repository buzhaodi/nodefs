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
var convert = require('xml-js');
const fs = require('fs');






router.get('/home', async (ctx, next) => {
	data = fs.readFileSync(__dirname + '/conf/vars.xml', 'utf8');
	// console.log(data);

	var result1 = convert.xml2json(data, {compact: false, spaces: 4});
	// var result2 = convert.json2xml(result1, {compact: false, spaces: 4});
	// fs.readFile(__dirname + '/vars.xml', function(err, data) {
	// 	var result1 = convert.xml2json(data, {compact: true, spaces: 4});
	// 	var result2 = convert.xml2json(data, {compact: false, spaces: 4});
	// });
// console.log(result1, '\n', result2);
		// ctx.response.body = result1+ '<br>'+ result2;
		ctx.response.body = result1;
})

//根据传入路径修改xml文件信息。 注意 是post方法如http://127.0.0.1:3000/putxml?path=dialplan/default.xml&content=xml内容 
router.post("/putxml",async(ctx,next)=>{
	let path = ctx.query.path;
	let content=ctx.query.content;
	ctx.response.body=path+content;
})


//根据传入路径获取xml文件信息。如http://127.0.0.1:3000/getxml?path=dialplan/default.xml

router.get('/getxml', async (ctx, next) => {
	let ctx_query = ctx.query;
	path=ctx_query.path;
	data = fs.readFileSync(__dirname + '/conf/'+path, 'utf8');
	// console.log(123123)
	ctx.response.body=convert.xml2json(data, {compact: false, spaces: 4});
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
