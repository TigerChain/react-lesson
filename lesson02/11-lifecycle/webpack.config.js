module.exports = {
  entry: __dirname+"/app/main.js",
  output:{
    path:__dirname + "/public",
    filename:"bundle.js"
  },
  module: {
    loaders: [
      //babel配置
    {
      test:/\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ]
  },
  devServer:{
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    // colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  }
}
