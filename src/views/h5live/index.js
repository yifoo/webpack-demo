/*
 * @Author: wuhao 
 * @Date: 2018-11-13 13:56:42 
 * @Desc: 主要展示组件内事件绑定逻辑
 * @Last Modified by: wuhao
 * @Last Modified time: 2019-01-03 17:42:34
 */
import "style-loader!css-loader!video.js/dist/video-js.css"
import videojs from 'video.js'
import * as HLS from 'videojs-contrib-hls';
export default class Index {
  constructor($root) {
    this.$root = $root
    this.render()
    this.$el = this.$root.children().first()
  }
  render() {
    var h5LiveTmpl = require('./h5liveTmpl.art')
    this.$root.html(h5LiveTmpl)
    var player = videojs('my-player');
    player.src({
      src: 'https://1256993030.vod2.myqcloud.com/d520582dvodtransgzp1256993030/cc9f922c5285890781386012275/v.f220.m3u8',
      type: 'application/x-mpegURL',
      withCredentials: false
    });



    // var player = videojs('my-player', {
    //   muted: true,
    //   height: 300,
    //   width: 500,
    //   loop: true,
    //   html5: {
    //     hls: {
    //       withCredentials: true
    //     }
    //   },
    // });
    // videojs("my-player").ready(function () {
    //   var myPlayer = this;
    //   // myPlayer.play();
    // });
    // player.play()
  }
}