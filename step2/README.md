# 加入热加载功能
完成了step1的操作之后，现在我们继续给项目增加热加载功能，只需要修改几个文件而已。  
  
首先修改一下webpack配置文件的几个部分  
```js
    // webpack/webpack.config.js

    entry: [
        'react-hot-loader/patch', // 开启 React 代码的模块热替换(HMR)
        'webpack-hot-middleware/client', // 连接服务器，以便重新构建时更新bundle包
        path.join(__dirname, '../src/index.js'), // 入口文件
    ]
```  
以及  
```js
    // webpack/webpack.config.js

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(), // 报错时不退出webpack进程
        new webpack.HotModuleReplacementPlugin(), // 代码热替换
    ]
```  
  
然后是.babelrc文件部分  
```json
    "env": {
        "development": {
            "plugins": ["react-hot-loader/babel"]
        }
    }
```  
  
接着是server/index.js部分  
```js
    // server/index.js

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

    app.use(views(path.resolve(__dirname, '../public'), {
        extension: 'ejs',
    }))

    router.get('*', async (ctx) => {
        await ctx.render('index', {
            __DEV__: true,
        })
    })

    app.use(router.routes()).use(router.allowedMethods())

    app.listen(8080)
```  
这里只是多了一个hotMiddleware。  
  
最后我们需要修改入口文件src/index.js  
```js
    // src/index.js
    
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { AppContainer } from 'react-hot-loader'
    // AppContainer 是一个 HMR 必须的包裹(wrapper)组件
    import App from './App'

    const render = (Component) => {
        ReactDOM.render(
            <AppContainer>
                <Component />
            </AppContainer>,
            document.getElementById('root'),
        )
    }

    render(App)

    // 模块热替换的 API
    if (module.hot) {
        module.hot.accept('./App.js', () => {
            const NextApp = require('./App').default
            render(NextApp)
        })
    }
```
  
以上就完成了react热加载的处理，重新启动项目，并尝试修改App.js或者app.css的内容，保存后就可以发现页面内容自动更新了。下一步我将在step3中引入react-router的简单使用。
