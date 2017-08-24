const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
    entry: [
        'react-hot-loader/patch', // 开启 React 代码的模块热替换(HMR)
        'webpack-hot-middleware/client', // 当发生热更新时控制台会有提示
        path.join(__dirname, '../src/index.tsx'), // 入口文件
    ],
    output: {
        filename: 'bundle.js', // 打包后的文件名
        chunkFilename: '[name].[chunkhash:5].js',
        path: path.join(__dirname, '/'), // 打包后的文件存储位置
        publicPath: '/',
    },
    target: 'web',
    resolve: {
        modules: [path.join(__dirname, '../node_modules')], // 优化webpack文件搜索范围
        extensions: ['.web.js', '.jsx', '.js', '.tsx', '.ts', '.json'],
    },

    devtool: 'cheap-module-eval-source-map', // 开启生成source-map文件功能便于代码调试

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                include: path.join(__dirname, '../src'),
                options: {
                    /* Loader options go here */
                },
            },
            {
                test: /\.tsx?$/,
                use: [
                    'react-hot-loader/webpack',
                    'awesome-typescript-loader?module=es6',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: /node_modules/,
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader?&modules&localIdentName=[local]-[hash:base64:5]', // 编译less文件的loader并开启css-modules功能
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer],
                        },
                    },
                    'less-loader',
                ],
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
        new webpack.NoEmitOnErrorsPlugin(), //报错时不退出webpack进程
        new webpack.HotModuleReplacementPlugin(), //代码热替换
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'), //用于区分开发和生产环境
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dist/vendor-manifest.json'),
        }),
    ],
}
