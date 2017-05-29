const Koa = require('koa')
const Pug = require('koa-pug')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const serve = require('koa-static')
const staticCache = require('koa-static-cache')
const path = require('path')
const config = require('./config')
const router = require('./router')

const app = new Koa()

new Pug({
  app,
  noCache: process.env.NODE_ENV === 'production',
  viewPath: path.resolve(__dirname, 'views'),
  locals: {
    title: config.title
  }
})

app.use(logger())

app.use(koaBody())

app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 7 * 24 * 60 * 60 // 7 天不更新，也就是缓存期限
}))

app.use(serve('public'))

app.use(async function (ctx, next) {
  try {
    await next()
  } catch (e) {
    if (ctx.status === 404) {
      ctx.render('404')
    }
    console.log('error', e)
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

console.log(`listen on port ${config.port}`)

app.listen(config.port)
