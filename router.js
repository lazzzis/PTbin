const Router = require('koa-router')
const moment = require('moment')
const hljs = require('highlightjs')
const codeHighlightLinenums = require('code-highlight-linenums')
const { Post } = require('./models')
const config = require('./config')
const router = new Router()

router.get('/', async function (ctx, next) {
  ctx.render('index', {
    languages: config.languages
  })
})

router.post('/', async function (ctx, next) {
  ctx.request.body.content = ctx.request.body.content.trim()
  const post = Post.build(ctx.request.body)
  await post.save()
  ctx.redirect(`/${post.pid}`)
})

router.get('/:pid', async function (ctx, next) {
  const pid = +ctx.params.pid
  if (isNaN(pid)) {
    ctx.throw(404)
  }
  const post = await Post.findOne({ where: { pid } })
  if (!post) {
    ctx.throw(404)
  }

  const content = codeHighlightLinenums(post.content, {
    hljs,
    lang: post.language,
    start: 1
  })

  ctx.render('post', {
    content,
    author: post.author,
    createdAt: moment(post.createdAt).format('ddd, MMMM Do YYYY, HH:mm:ss'),
    pid: post.pid
  })
})

router.get('/:pid/raw', async function (ctx, next) {
  const pid = ctx.params.pid
  const post = await Post.findOne({ where: { pid } })
  ctx.body = post.content
})

module.exports = router
