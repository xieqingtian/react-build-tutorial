# 使用koa2启动http服务并显示页面  
首先我们按照以下目录结构新增一些目录以及文件  
```js
    │  .babelrc                    // babel配置文件
    │  package-lock.json
    │  package.json
    │  README.md
    │
    ├─public
    │      index.ejs               // 页面模版
    │
    ├─server
    │      index.js                // 开启http服务
    │
    ├─src
    │      app.css
    │      App.js                  // 某个react组件
    │      index.js                // 入口文件
    │
    └─webpack
            webpack.config.js      // webpack配置文件
```  
  
接下来让我们按顺序给新增的文件增加代码吧  
  
```js
    // .babelrc

    {
        "presets": [
            [
                "env",
                {
                    "modules": false
                }
            ],
            "react",
            "stage-0"
        ],
        "env": {
            "development": {
                "plugins": []
            }
        },
        "plugins": ["transform-runtime", "transform-decorators-legacy"]
    }
```  
这是babel的配置文件，用于声明一些编译e6+的规则以及辅助插件  
  
```html
    // public/index.ejs

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>

    <body>
        <div id="root"></div>
        <% if(__DEV__ === true){ %>
            <script src="/bundle.js"></script>
        <% } %>
    </body>

    </html>
```  
这个是应用主页面的模版了，之所以使用ejs，是因为我想通过给html中注入一些变量(例如上面代码中的__DEV__),来区分开发与生产环境的html结构。  
  
```js
    // server/index.js

    const Koa = require('koa')
    const webpack = require('webpack')
    const Router = require('koa-router')
    const path = require('path')
    const { devMiddleware } = require('koa-webpack-middleware')
    const views = require('koa-views')

    const router = new Router()
    const app = new Koa()

    const webpackConfig = require('../webpack/webpack.config')

    const compiler = webpack(webpackConfig)

    app.use(devMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
    }))

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
```
这个是使用koa2启动一个http服务器，上述的devMiddleware可以把webpack打包后的bundle.js存储在内存中，渲染模版页面那部分代码作用是，接收到任意url，服务器都将读取public下的index.ejs模版，并注入__DEV__变量为true，然后发送转换后的html内容。这也为后面使用前端的browerRouter做好了准备。  
  
```css
    /* src/app.css */

    .text{
        color: red;
    }
```  
App组件的样式  
  
```jsx
    // src/App.js

    import React, { Component } from 'react'
    import styles from './app.css'

    class App extends Component {
        componentDidMount() {}
        render() {
            return <h1 className={styles.text}>hello world</h1>
        }
    }

    export default App
```  
App组件  
  
```jsx
    // src/index.js

    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from './App'

    ReactDOM.render(<App />, document.getElementById('root'))
```  
应用入口文件  
  
最后是webpack的配置文件如下  
```js
    // webpack/webpack.config.js

    const path = require('path')
    const webpack = require('webpack')

    module.exports = {
        entry: path.join(__dirname, '../src/index.js'), // 入口文件
        output: {
            filename: 'bundle.js', // 打包后的文件名
            chunkFilename: '[name].[chunkhash:5].js', // 非入口文件名
            path: path.join(__dirname, '/'), // 打包后的文件存储位置
            publicPath: '/',
        },
        target: 'web',
        resolve: {
            modules: [path.join(__dirname, '../node_modules')], // 优化webpack文件搜索范围
            extensions: ['.web.js', '.jsx', '.js', '.tsx', '.ts', '.json'], // 声明导入模块时能省略后缀的文件类型
        },

        devtool: 'cheap-module-eval-source-map', // 开启生成source-map文件功能便于代码调试

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: ['babel-loader?cacheDirectory'], // 开启编译缓存
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader?modules&localIdentName=[local]-[hash:base64:5]', // 编译css文件的loader并开启css-modules功能
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
                    use: ['url-loader?limit=10240'],
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: 'url-loader?limit=10000',
                },
                {
                    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: 'file-loader',
                },
            ],
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(), // 报错时不退出webpack进程
        ],
    }
```  
  
最后别忘了给你的package.json文件加上启动命令  
```json
    "start": "node server/index.js"
```  
  
做好上述准备工作之后，运行  
```js
npm start
```
http服务成功开启后访问localhost:8080，看看效果吧。 

接下来的step2中我将在step1的基础之上增加热加载功能
