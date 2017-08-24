const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'mobx-react',
            'qs',
            'axios',
            'react-router-dom',
            'mobx',
        ],
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, '../dist'),
        library: '[name]_lib',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../dist', '[name]-manifest.json'),
            name: '[name]_lib',
            context: __dirname,
        }),
    ],
}
