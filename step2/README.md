# 加入热加载功能
完成了step1的操作之后，现在我们继续给项目增加热加载功能  
想要使用react的热加载我们必须先安装[react-hot-loader](https://github.com/gaearon/react-hot-loader)，执行以下命令进行安装  
```js
npm install --save react-hot-loader@next
```
安装好之后我们需要修改一下server.js，.babelrc，webpack.config.js，index.js这几个文件  

server.js文件修改如下
```js
const Koa = require('koa')
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.config')
const hotMiddleware = require('./middleware/hotMiddleware')
const devMiddleware = require('./middleware/devMiddleware')
const path = require('path')
const Router = require('koa-router')
const fs = require('fs')

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

router.get('/favicon.ico', (ctx, next) => {
    ctx.body = null
})

//渲染页面
router.get('/', async (ctx, next) => {
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

app.listen(3000)
```
.babelrc文件修改如下
```js
{
    "presets": [
        [
            "latest",
            {
                "modules": false
            }
        ],
        "stage-0",
        "react"
    ],
    "env": {
        "development": {
            "plugins": [
                "react-hot-loader/babel"
            ]
        }
    },
    "plugins": [
        "transform-runtime",
        "transform-decorators-legacy"
    ]
}
```
webpack.config.js文件修改如下
```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: [
        'react-hot-loader/patch', // 开启 React 代码的模块热替换(HMR)
        'webpack-hot-middleware/client', // 当发生热更新时控制台会有提示
        path.join(__dirname, '../src/index.js')// 入口文件
    ],
    output: {
        filename: 'bundle.js', // 打包后的文件名
        chunkFilename: '[name].[chunkhash:5].js',
        path: path.join(__dirname, '/'), // 打包后的文件存储位置
        publicPath: '/'
    },

    resolve: {
        modules: [path.join(__dirname, '../node_modules')], // 优化webpack文件搜索范围
        extensions: ['.web.js', '.jsx', '.js', '.json']
    },

    devtool: 'cheap-module-eval-source-map', // 开启生成source-map文件功能便于代码调试

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'], // 开启编译缓存
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?modules&localIdentName=[local]-[hash:base64:5]', // 编译css文件的loader并开启css-modules功能
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader?&modules&localIdentName=[local]-[hash:base64:5]', // 编译less文件的loader并开启css-modules功能
                    'less-loader'
                ],
            },
            {
                test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
                use: ['url-loader?limit=10240']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader'
            }
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),//报错时不退出webpack进程
        new webpack.HotModuleReplacementPlugin(),//代码热替换
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'//用于区分开发和生产环境
        })
    ],
}
```
index.js入口文件修改如下
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件
import App from './components/App'

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

render(App)

// 模块热替换的 API
if (module.hot) {
    module.hot.accept('./components/App.js', () => {
        const NextApp = require('./components/App.js').default
        render(NextApp)
    })
}
```
以上就完成了react热加载的处理，重新启动项目，并尝试修改App.js或者app.less的内容，保存后就可以发现页面内容自动更新了。  