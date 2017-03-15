const webpack = require('webpack');

module.exports = {
  entry: __dirname +"/app/main.js",//唯一的入口文件
  output:{
    path: __dirname +"/public",//打包后文件存放的目录
    filename:'bundle.js' //打包后输入的文件名
  },
  // //以下是新增的配置
  devServer:{
   contentBase: "./public",//本地服务器所加载的页面所在的目录
  //  colors: true,//终端中输出结果为彩色
   historyApiFallback: true,//不跳转
   inline: true//实时刷新
  }
}
