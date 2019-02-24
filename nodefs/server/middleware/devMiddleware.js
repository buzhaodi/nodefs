const webpackDev  = require('webpack-dev-middleware');//安装此包最好不要装最新版本，否则会提示需要webpack4.0及以上版本

const devMiddleware = (compiler, opts) => {
  const middleware = webpackDev(compiler, opts);
  return async (ctx, next) => {
    await middleware(ctx.req, {
      end: (content) => {
        ctx.body = content;
      },
      setHeader: (name, value) => {
        ctx.set(name, value);
      }
    }, next);
  };
};

module.exports=devMiddleware;
