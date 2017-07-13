# 使用Dll插件优化webpack开发构建速度  
随着项目的规模越来越大，我们所使用的第三方库也会越来越多，webpack构建的速度也会越来越慢，想想每次启动项目都要等20多秒就头疼不已。  
webpack提供了一个插件可以让我们预先打包好你想打包的第三方库文件，然后以后每次构建的时候我们就可以只打包自己的业务代码了。这就是dll打包的作用，省去了每次重新打包第三方库文件的操作，极大提高了开发时的构建效率。  
下面让我们基于[step4](https://github.com/sundaypig/build-react-tutorial/tree/master/step4)的项目加上dll配置。  
首先我们在webpack文件夹内新建一个webpack.config.dll.js文件，内容如下：  
```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, '../dist'),
        library: '[name]_lib'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../dist', '[name]-manifest.json'),
            name: '[name]_lib',
            context: __dirname
        })
    ]
}
```
这是使用dll插件打包第三方库的配置。  
然后我们给package.json文件添加上dll打包的命令  
```js
{
    "name": "redux-demo",
    "version": "1.0.0",
    "description": "a simple react demo with redux",
    "main": "index.js",
    "scripts": {
        "start": "node ./server/server.js",
        "dll": "webpack --config ./webpack/webpack.config.dll.js"
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
        "react-hot-loader": "^3.0.0-beta.7",
        "style-loader": "^0.18.2",
        "url-loader": "^0.5.9",
        "webpack": "^3.0.0",
        "webpack-dev-middleware": "^1.11.0",
        "webpack-hot-middleware": "^2.18.1"
    },
    "dependencies": {
        "history": "^4.6.3",
        "prop-types": "^15.5.10",
        "react": "^15.6.1",
        "react-dom": "^15.6.1",
        "react-redux": "^5.0.5",
        "react-router-dom": "^4.1.1",
        "react-router-redux": "^5.0.0-alpha.6",
        "react-transition-group": "^2.0.2",
        "redux": "^3.7.1",
        "redux-thunk": "^2.2.0"
    }
}
```
这样一来运行npm run dll命令即可将第三方库预先打包出来，项目的根目录将生成一个dist文件夹，内中的vender.dll.js即是我们打包好的第三方库文件。接下来我们需要在webpack.config.js文件内添加dll插件。只需多加上一段代码  
```js
new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dist/vendor-manifest.json')
        }),
```  
完整的webpack.config.js代码如下：  
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
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dist/vendor-manifest.json')//引入预打包好的第三方库的映射文件
        }),
    ],
}

```  
做好这一步以后，我们还需要修改一下我们的模板文件index.html，因为我们将第三方库和业务代码分离了，所以在index.html中的js引入也要做出相应的修改如下：  
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
    <script src="/vendor.dll.js"></script>
    <script src="/bundle.js"></script>
</body>

</html>
```    
最后我们需要下载一个koa的提供静态文件服务的库，运行一下命令安装一下：  
```js
npm i --save-dev koa-static
```  
然后修改一下我们的server.js文件如下：  
```js
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

router.get('/favicon.ico', (ctx, next) => {
    ctx.body = null
})

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
```  
其实只是将我们项目中的dist目录静态化了，因为我们之前使用了前端的browerHistory路由，不将dist目录静态化的话页面请求vendor.dll.js将会返回index.html文件，这不是我们想要的。  

这样我们就修改完成了，现在我们就可以预先运行命令  
```js
npm run dll
```
打包好第三方库再运行命令   
```js
npm start
```  
之后每次启动项目的时候只要你的第三方库没有更新，就不用重新运行预打包命令了，直接npm start即可。项目有一定规模的时候这个方案是极好的，大大加快了webpack打包以及热更新的速度，当然在生产环境也是可以使用这个方案的，不过更加建议在开发环境使用。  
接下来的[step6](https://github.com/sundaypig/build-react-tutorial/tree/master/step6)中我会给出生产环境的配置。