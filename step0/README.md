# 安装项目所需依赖包  
## devDependencies  
* [autodll-webpack-plugin](https://github.com/asfktz/autodll-webpack-plugin) ------------------------- 简化dll打包  
* [autoprefixer](https://github.com/postcss/autoprefixer) -------------------------------------- 处理浏览器厂商前缀  
* babel-core ---------------------------------------- babel核心包 
* [babel-eslint](https://github.com/babel/babel-eslint) --------------------------------------- 配合eslint检测es6代码
* [babel-loader](https://github.com/babel/babel-loader) -------------------------------------- 编译js  
* [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) ----- 转换装饰器语法  
* babel-plugin-transform-runtime ---------------- 处理编译过程中产生的重复工具函数 
* [babel-preset-env](https://github.com/babel/babel-preset-env) --------------------------------- es6转换  
* babel-preset-react -------------------------------- jsx转换  
* babel-preset-stage-0 ----------------------------- es6转换  
* babel-runtime ------------------------------------- 处理编译过程中产生的重复工具函数  
* [css-loader](https://github.com/webpack-contrib/css-loader) ------------------------------------------ webpack处理css文件  
* [ejs](https://github.com/tj/ejs) -------------------------------------------------- html模版引擎  
* [eslint](https://github.com/eslint/eslint) ----------------------------------------------- 代码风格检测工具  
* eslint-config-airbnb ------------------------------- airbnb的js书写规范  
* [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) ------------------------------- 增加eslint对export和import的语法支持  
* [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) ----------------------------- jsx书写规范  
* [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) --------------------------------- react代码书写规范  
* [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) ---------------------- 提取打包进js中的样式代码到css文件中  
* [file-loader](https://github.com/webpack-contrib/file-loader) ------------------------------------------ webpack处理图片，字体等静态资源  
* [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) ------------------------------ 自动生成html文件  
* [koa](https://github.com/koajs/koa) -------------------------------------------------- 这里只用于搭建前端本地http服务  
* [koa-router](https://github.com/alexmingoia/koa-router) ------------------------------------------ express风格的koa路由  
* [koa-views](https://github.com/queckezz/koa-views) ------------------------------------------- koa的模版渲染中间件  
* [koa-webpack-middleware](https://github.com/leecade/koa-webpack-middleware) ------------------------- 使webpack-dev-middleware及webpack-hot-middleware兼容koa2  
* [less](https://github.com/less/less.js) -------------------------------------------------- less支持  
* [less-loader](https://github.com/webpack-contrib/less-loader) ------------------------------------------ webpack处理less文件  
* [postcss-loader](https://github.com/postcss/postcss-loader) -------------------------------------- css预处理  
* [react-hot-loader](https://github.com/gaearon/react-hot-loader) ------------------------------------ 代码热更新  
* [rimraf](https://github.com/isaacs/rimraf) ----------------------------------------------- 删除文件的小工具  
* [style-loader](https://github.com/webpack-contrib/style-loader) ----------------------------------------- 将解析后的样式加入页面  
* [url-loader](https://github.com/webpack-contrib/url-loader) ------------------------------------------- 小于给定大小的图片或字体等资源编译成base64码，否则用file-loader处理  
* [webpack](https://github.com/webpack/webpack) -------------------------------------------- 打包工具  
* [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) ------------------------- 用于观察打包后文件中的模块构成工具  
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) ------------------------- node服务与webpack结合，打包的js文件存储在内存中  
* [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) ------------------------- 代码热更新支持  
## dependencies  
* [axios](https://github.com/axios/axios) ------------------------------------------------ http请求库  
* [history](https://github.com/ReactTraining/history) ---------------------------------------------- 配合react-router-redux使用  
* [qs](https://github.com/ljharb/qs) --------------------------------------------------- url参数解析，配合axios使用  
* [react](https://github.com/facebook/react) ------------------------------------------------ 不多说  
* react-dom ------------------------------------------ 不解释  
* [react-redux](https://github.com/reactjs/react-redux) ----------------------------------------- react bind redux  
* [react-router-dom](https://github.com/ReactTraining/react-router) ---------------------------------- react路由  
* [react-router-redux](https://github.com/reactjs/react-router-redux) --------------------------------- 同步路由状态至store中( ps: 这个库下载时需下载next版本 )  
* [redux](https://github.com/reactjs/redux) ----------------------------------------------- 状态管理方案  
* [redux-actions](https://github.com/reduxactions/redux-actions) -------------------------------------- 简化action书写  
* [redux-observable](https://github.com/redux-observable/redux-observable) ---------------------------------- redux异步方案   
* [rxjs](https://github.com/ReactiveX/rxjs) ------------------------------------------------- 好东西  
  
## 运行以下命令安装开发依赖  
```js
    npm i --save-dev autodll-webpack-plugin autoprefixer babel-core babel-eslint babel-loader babel-plugin-transform-decorators-legacy babel-plugin-transform-runtime babel-preset-env babel-preset-react babel-preset-stage-0 babel-runtime css-loader ejs eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react extract-text-webpack-plugin file-loader html-webpack-plugin koa koa-router koa-views koa-webpack-middleware less less-loader postcss-loader react-hot-loader rimraf style-loader url-loader webpack webpack-bundle-analyzer webpack-dev-middleware webpack-hot-middleware
```
  
## 再运行一下命令安装生产依赖  
```js
    npm i --save axios history qs react react-dom react-redux react-router-dom react-router-redux@next redux redux-actions redux-observable rxjs
```  
这样准备工作就完成了，下一步我将在step1使用koa和webpack-dev-middleware搭建一个本地服务器并启动一个react页面。
