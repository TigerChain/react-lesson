module.exports = {
  entry:__dirname+"/app/main.js", //唯一的文件入口
  output:{
    path:__dirname+"/public",
    filename:'bundle.js'
  },
  devServer:{
     contentBase: "./public",//本地服务器所加载的页面所在的目录
     historyApiFallback: true,//不跳转
     inline: true//实时刷新
   },
  module:{
    loaders:[
    //babel配置
    {
      test:/\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }
  ]
  }
}
