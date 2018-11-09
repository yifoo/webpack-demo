## Webpack +jQuery 单页面Demo [思维导图](https://www.haohome.top/file/webpack.html)

预览链接:[点击访问](https://www.haohome.top/webpack-spa/)

Demo结构:

```shell
├── config
│   ├── config.js
│   ├── utils.js
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   ├── webpack.prod.js
│   └── webpack.test.js
├── dist
│   ├── index.html
│   └── static
├── package-lock.json
├── package.json
├── postcss.config.js
├── readme.md
├── src
│   ├── assets
│   ├── common
│   ├── index.html
│   ├── main.js
│   ├── route
│   └── views
├── static
│   ├── favicon.ico
│   └── lib
└── tree.md
```

### 2018-11-9 更新日志

1. 更新webpack编译配置,开发环境不导出独立css文件,开发环境css修改静默更新,减少开发环境资源消耗,添加友好控制台代码日志显示;
2. 添加单页面**路由控制器**,配置好路径即可实例化访问组件,实现多级单页面控制;
3. 优化组件内事件绑定逻辑,让绑定事件更简单;

### 2018-7-6 更新日志

1. webpack版本为3.11.0;
2. 实现了js、html、css的自动化打包，同时识别并编译html中url，css中url（主要为img图片）；
3. 引入jQuery并生成全局变量，个人认为这是最佳的引入方式；
4. 利用babel将代码中的ES6语法转为ES5；
5. 利用postcss-loder 自动追加css浏览器前缀；
6. 配置了部分代码js和css的压缩;
7. 可根据环境配置变量,如接口api;

能力有限,如有BUG可在[Issues区](https://github.com/yifoo/webpack-demo/issues)留言
