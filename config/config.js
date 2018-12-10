'use strict'
const path = require('path')
const os = require('os')

// 获取本机ip地址
function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
const IPV4 = getIPAdress() ? getIPAdress() : 'localhost'
module.exports = {
  dev: {
    host: IPV4,
    port: 8093,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    devtool: 'cheap-module-eval-source-map',
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  }
}