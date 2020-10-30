# ebook
另一种搭配脚手架（offline离线下载脚手架）： 
    先从github上下载模版： https://github.com/vuejs-templates/webpack
    命令行输入： vue init 下载后的文件名称 --offline 新的项目名称

# reset样式 
   消除不同浏览器之间的样式
   https://meyerweb.com/eric/tools/css/reset/

# global 样式
   规定项目的公共样式、公共方法和公共参数

# scss版本问题
   这里需要把sass-loader版本改为^7.3.1, 版本高了会报错

# eslint 规则
   在eslintrc.js rules下添加

# Excel 文件
   excel 使用xlsx插件进行导出下载表格

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
