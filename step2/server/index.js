const Koa = require('koa')
const webpack = require('webpack')
const Router = require('koa-router')
const path = require('path')
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
const views = require('koa-views')

const router = new Router()
const app = new Koa()

const webpackConfig = require('../webpack/webpack.config')

const compiler = webpack(webpackConfig)

app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
}))

app.use(hotMiddleware(compiler))

// 设置esj模版引擎，静态化public目录
app.use(views(path.resolve(__dirname, '../public'), {
    extension: 'ejs',
}))

// 渲染模版页面
router.get('*', async (ctx) => {
    await ctx.render('index', {
        __DEV__: true,
    })
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080)
