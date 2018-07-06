## Webpack 入门Demo

Demo结构:

├── config
│   ├── config.js
│   ├── utils.js
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── dist
├── package-lock.json
├── package.json
├── postcss.config.js
├── readme.md
├── src
│   ├── common
│   ├── css
│   ├── img
│   ├── js
│   ├── lib
│   ├── main.js
│   ├── page
│   └── static	//静态资源文件夹
├── tree.jpg
└── tree.md

1. webpack版本为3.11.0;
2. 所有的资源文件都在src路径中,main.js为项目的总入口;
3. 项目实现了js、html、css的自动化打包，同时识别并编译html中url，css中url（主要为img图片）；
4. 引入jQuery并生成全局变量，个人认为这是最佳的引入方式；
5. 利用babel将代码中的ES6语法转为ES5；
6. 利用postcss-loder 自动追加css浏览器前缀；