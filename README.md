# Simple Mock Data
简易的本地模拟数据服务，使用方便，基于 [mock.js](http://mockjs.com/)、koa、nodemon 制作，支持 http 协议

## 目录
- [Simple Mock Data](#simple-mock-data)
  - [目录](#目录)
  - [安装](#安装)
  - [使用方式](#使用方式)
  - [配置方式](#配置方式)
    - [数据文件](#数据文件)
    - [Options](#options)
  - [推荐使用方式](#推荐使用方式)

## 安装
```cmd
npm i simple-mock-data -g
```
或者
```cmd
npm i simple-mock-data -d
```

## 使用方式
直接使用命令行的方式包装了您的应用程序，因此您可以将通常传递给应用程序的所有参数传递给
例如：
```cmd
simple-mock-data -p 3002 -d ./example/db -P '' -ls 0
```

或者在 nodejs 中使用
```js
const simpleMock = require('simple-mock-data')

// prot:端口 dir:数据文件 prefix:路由前缀 listShow:是否显示接口列表
simpleMock(3001, './db', { prefix: '/api', listShow: true });
```

## 配置方式
### 数据文件
指定了数据文件夹后，会自动读取目录下的 js 文件，文件修改会自动重启服务

具体配置方式请参考 [example](./example/) 下的 db 文件
```js
module.exports = {
  // 方法 路由 状态，以单个空格分开
  'post /test 401': {
    msg: 'hello worlds',
    code: 40001,
  },
  'get /test/list': {
    // mock.js 的参数生成方式
    'list|1-100': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
      },
    ],
  },
};
```

### Options
```
  -v, --version             输出当前的版本号
  -p, --prot [number]       端口号 (default: 3001)
  -d, --dir <string>        路径 (default: "./db")
  -P, --prefix <string>     接口前缀 (default: "/api")
  -ls, --listShow <number>  是否显示接口列表 (default: 1)
  -h, --help                display help for command
```

## 推荐使用方式
在 package.json 中设置脚本，同时配合 [concurrently](https://www.npmjs.com/package/concurrently) 使用效果更佳
```
"scripts": {
  "start": "concurrently \"npm run dev\" \"npm run mock\"",
  "mock": "simple-mock-data -p 3001 -d ./example/db -P '/api' -ls 1"
},
```
关于代理方面，请参考：
- webpack: https://webpack.docschina.org/configuration/dev-server/#devserverproxy
- vue: https://cli.vuejs.org/zh/config/#devserver