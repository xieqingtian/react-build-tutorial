# 使用koa2启动http服务并显示页面
首先按照以下目录结构新增一些目录以及文件，详细如下
```js
│  .babelrc                      //babel配置文件
│  package.json
│  README.md
│
├─server                         //存放服务端代码文件
│  │  server.js                  //开启http服务
│  │
│  └─middleware
│          devMiddleware.js      //koa中间件，可以让webpack-dev-middleware配合koa使用
│          hotMiddleware.js      
│
├─src                            //存放前端业务代码文件
│  │  index.js                   //前端页面入口文件
│  │
│  ├─assets                      //前端静态资源目录
│  │      index.html             
│  │
│  └─components                  //存放你的react组件
│          App.js
│          app.less
│
└─webpack                       //存放webpack配置文件
        webpack.config.js
```
.babelrc文件内容如下
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
    "plugins": [
        "transform-runtime",
        "transform-decorators-legacy"
    ]
}
```
server.js文件内容如下
```js
const Koa = require('koa')
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.config')
//const hotMiddleware = require('./middleware/hotMiddleware')
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
devMiddleware.js文件内容如下
```js
const devMiddleware = require('webpack-dev-middleware')

module.exports = (compiler, opts) => {
    const expressMiddleware = devMiddleware(compiler, opts)
    return async (ctx, next) => {
        await expressMiddleware(ctx.req, {
            end: (content) => {
                ctx.body = content
            },
            setHeader: (name, value) => {
                ctx.set(name, value)
            }
        }, next)
    }
}
```
hotMiddleware.js文件内容如下
```js
const hotMiddleware = require('webpack-hot-middleware')
const { PassThrough } = require('stream')

module.exports = (compiler, opts) => {
    const expressMiddleware = hotMiddleware(compiler, opts)
    return async (ctx, next) => {
        let stream = new PassThrough()
        ctx.body = stream
        await expressMiddleware(ctx.req, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status
                ctx.set(headers)
            }
        }, next)
    }
}
```
webpack.config.js文件内容如下
```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: [
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'//用于区分开发和生产环境
        })
    ],
}
```
index.html文件内容如下
```html
<!DOCTYPE html>
<html lang="en" style="height: 100%;">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>react-demo</title>
</head>

<body>
    <div id="root" style="height:100%"></div>
    <script src="/bundle.js"></script>
</body>

</html>
```
index.js文件内容如下
```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

ReactDOM.render(<App />, document.getElementById('root'))
```
App.js文件内容如下
```js
import React, { Component } from 'react'
import styles from './app.less'

class App extends Component {
    render() {
        return (
            <h1 className={styles.title}>hello react</h1>
        )
    }
}

export default App
```
app.less文件内容如下
```css
.title{
    color: red;
}
```
对了，package.json还需要加上启动命令，如下
```js
{
    "name": "redux-demo",
    "version": "1.0.0",
    "description": "a simple react demo with redux",
    "main": "index.js",
    "scripts": {
        "start": "node ./server/server.js"
    },
    "keywords": [
        "react",
        "redux"
    ],
    "author": "sundaypig",
    "license": "ISC",
    "devDependencies": {
        "babel-core": "^6.25.0",
        "babel-loader": "^7.1.1",
        "babel-plugin-transform-decorators-legacy": "^1.3.4",
        "babel-plugin-transform-runtime": "^6.23.0",
        "babel-preset-latest": "^6.24.1",
        "babel-preset-react": "^6.24.1",
        "babel-preset-stage-0": "^6.24.1",
        "babel-runtime": "^6.23.0",
        "css-loader": "^0.28.4",
        "file-loader": "^0.11.2",
        "koa": "^2.3.0",
        "koa-router": "^7.2.1",
        "less": "^2.7.2",
        "less-loader": "^4.0.4",
        "style-loader": "^0.18.2",
        "url-loader": "^0.5.9",
        "webpack": "^3.0.0",
        "webpack-dev-middleware": "^1.11.0",
        "webpack-hot-middleware": "^2.18.1"
    },
    "dependencies": {
        "prop-types": "^15.5.10",
        "react": "^15.6.1",
        "react-dom": "^15.6.1"
    }
}
```
做好上述准备工作之后，运行  
```js
npm start
```
http服务成功开启后访问localhost:3000，看看效果吧。 

在[step2](https://github.com/sundaypig/build-react-tutorial/tree/master/step2)中我将在[step1](https://github.com/sundaypig/build-react-tutorial/tree/master/step1)的基础之上增加热加载功能


