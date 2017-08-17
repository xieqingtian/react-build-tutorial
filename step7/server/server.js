const Koa = require('koa')
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.config')
const hotMiddleware = require('./middleware/hotMiddleware')
const devMiddleware = require('./middleware/devMiddleware')
const path = require('path')
const Router = require('koa-router')
const fs = require('fs')
const serve = require('koa-static')

const router = new Router()
const app = new Koa()
const compiler = webpack(webpackConfig)

app.use(devMiddleware(compiler, {
    noInfo: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false
    },
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
}))

app.use(hotMiddleware(compiler, {
    // log: console.log,
    // path: '/__webpack_hmr',
    // heartbeat: 10 * 1000
}))

//静态文件服务
app.use(serve(path.join(__dirname, '../dist')))

//渲染页面
router.get('*', async (ctx, next) => {
    const htmlFile = await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname,'../src/assets/index.html'), (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
    ctx.type = 'html'
    ctx.body = htmlFile
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3001)