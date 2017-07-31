# 生产环境构建  
我们延续[step5](https://github.com/sundaypig/build-react-tutorial/tree/master/step5)的内容继续为项目增加生产环境的配置。  
首先我们要先安装以下几个库  
+ [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) 用于提取出css模块到单独的css文件  
+ [autoprefixer](https://github.com/postcss/autoprefixer) 可以结合postcss-loader处理css的兼容性问题，例如自动添加厂商前缀和flexBox的旧版写法B 
+ [postcss-loader](https://github.com/postcss/postcss-loader) 如上  
+ [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 打包后根据模板生成html文件并自动插入打包生成的js及css文件  
+ [webpack-visualizer-plugin](https://github.com/chrisbateman/webpack-visualizer) 打包后可生成一个用于分析bundle的html文件  
现在就运行一下命令来安装一下吧  
```js
npm i --save-dev extract-text-webpack-plugin autoprefixer postcss-loader html-webpack-plugin webpack-visualizer-plugin
```  
安装好以上依赖后我们需要新增加一个webpack的配置文件用于构建生产环境，在webpack文件夹新增文件webpack.config.prod.js如下  
```js
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const Visualizer = require('webpack-visualizer-plugin')

module.exports = {
    entry: {
        main: path.join(__dirname, '../src/index.js'), //入口文件
        vendor: [
            'react',
            'react-dom',
            'react-router-dom'
        ] //分离第三方库
    },
    output: {
        filename: '[name].[chunkhash:5].js', //打包后的文件名
        chunkFilename: '[name].[chunkhash:5].js',
        path: path.join(__dirname, '../build'), //打包后的文件存储位置
        publicPath: '/' //此处上线部署再改，对应的是服务器上存储打包后文件的路径
    },

    resolve: {
        modules: [path.join(__dirname, '../node_modules')], //优化webpack文件搜索范围
        mainFields: ['jsnext:main', 'main'], //优化支持tree-shaking的库
        extensions: ['.web.js', '.jsx', '.js', '.json']
    },

    //devtool: 'cheap-module-eval-source-map',//生产环境需关闭该功能,否则打包后体积会变大

    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader', //编译js文件的loader,
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?minimize=true&modules&localIdentName=[local]-[hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer]
                        }
                    },
                ]
            }),
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
            include: /node_modules/
        },
        {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?minimize=true&modules&localIdentName=[local]-[hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer]
                        }
                    },
                    'less-loader'
                ]
            })
        },
        {
            test: /\.(jpe?g|png|gif|mp4|webm|otf|webp)$/,
            use: ['url-loader?limit=10240?outputPath=static/']
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'file-loader?outputPath=static/'
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: 'file-loader?outputPath=static/'
        }
        ],
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(), //报错时不退出webpack进程
        new webpack.optimize.ModuleConcatenationPlugin(),//开启webpack3范围提升
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"' //用于区分开发和生产环境
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false, //最紧凑的输出
            comments: false, //删除注释
            compress: {
                warnings: false, //在UglifyJs删除没有用到的代码时不输出警告
                drop_console: true, //删除所有console语句
                collapse_vars: true, //内嵌定义了但是只用到一次的变量
                reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
            }
        }),
        new HtmlWebpackPlugin({ //自动生成html
            template: path.join(__dirname, '../src/assets/index.html'),
            chunksSortMode: 'dependency'
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('[name].[contenthash].css').replace('dist/js', 'css')
            },
            allChunks: true
        }), //提取css文件
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'] // 指定公共 bundle 的名字,加manifest防止vendor的hash值改变。
        }),
        new Visualizer() //打包后可生成一个html文件,直接打开可看到打包文件的具体信息(包含各个模块的比重)
    ],
}
```  
上述文件中的配置已经做了详细的注释，这里就不多做解释了。然后我们给package.json文件加入打包命令  
```js
{
    "name": "redux-demo",
    "version": "1.0.0",
    "description": "a simple react demo with redux",
    "main": "index.js",
    "scripts": {
        "start": "node ./server/server.js",
        "dll": "webpack --config ./webpack/webpack.config.dll.js",
        "build": "set NODE_ENV=production&& webpack --progress --colors --config ./webpack/webpack.config.prod.js"
    },
    "keywords": [
        "react",
        "redux"
    ],
    "author": "sundaypig",
    "license": "ISC",
    "devDependencies": {
        "autoprefixer": "^7.1.2",
        "babel-core": "^6.25.0",
        "babel-loader": "^7.1.1",
        "babel-plugin-transform-decorators-legacy": "^1.3.4",
        "babel-plugin-transform-runtime": "^6.23.0",
        "babel-preset-latest": "^6.24.1",
        "babel-preset-react": "^6.24.1",
        "babel-preset-stage-0": "^6.24.1",
        "babel-runtime": "^6.23.0",
        "css-loader": "^0.28.4",
        "extract-text-webpack-plugin": "^3.0.0",
        "file-loader": "^0.11.2",
        "html-webpack-plugin": "^2.29.0",
        "koa": "^2.3.0",
        "koa-router": "^7.2.1",
        "koa-static": "^4.0.1",
        "less": "^2.7.2",
        "less-loader": "^4.0.4",
        "postcss-loader": "^2.0.6",
        "react-hot-loader": "^3.0.0-beta.7",
        "style-loader": "^0.18.2",
        "url-loader": "^0.5.9",
        "webpack": "^3.4.1",
        "webpack-dev-middleware": "^1.11.0",
        "webpack-hot-middleware": "^2.18.1",
        "webpack-visualizer-plugin": "^0.1.11"
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
最后运行一下  
```js
npm run build
```  
然后我们删除掉生成的html文件中不必要的script标签如下  
```html
<!DOCTYPE html>
<html lang="en" style="height: 100%;">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>react-demo</title>
    <link href="./main.6ca82690f8f74c7e5adf34cbc71be016.css" rel="stylesheet">
</head>

<body>
    <div id="root" style="height:100%"></div>
    <script type="text/javascript" src="./manifest.e9431.js"></script>
    <script type="text/javascript" src="./vendor.2a787.js"></script>
    <script type="text/javascript" src="./main.84363.js"></script>
</body>

</html>
```  
其实就是删除了模板文件中的这两个标签
```html
<script src="/vendor.dll.js"></script>
<script src="/bundle.js"></script>
```  
到此打包就完成了，如果打包遇到了错误，请务必将webpack升级到最新版本，或者直接使用本教程相同的依赖版本即可，希望对大家有所帮助!
