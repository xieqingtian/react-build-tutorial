# 安装项目所需依赖包
首先安装一些基本的依赖包，后续会逐渐增加到全家桶的程度。
```js
//devDependencies
babel-core                       
babel-loader                     
babel-preset-latest              
babel-preset-react
babel-preset-stage-0
babel-plugin-transform-runtime
babel-plugin-transform-decorators-legacy
babel-runtime
css-loader
file-loader
less-loader
style-loader
url-loader
webpack
webpack-dev-middleware
webpack-hot-middleware
less
koa
koa-router
```
```js
//dependencies
prop-types
react
react-dom
```
运行以下命令安装开发依赖
```js
    npm i --save-dev babel-core babel-loader babel-preset-latest babel-preset-react babel-preset-stage-0 babel-plugin-transform-runtime babel-plugin-transform-decorators-legacy babel-runtime css-loader file-loader less-loader style-loader url-loader webpack webpack-dev-middleware webpack-hot-middleware less koa koa-router
```
再运行一下命令安装生产依赖
```js
    npm i --save prop-types react react-dom
```