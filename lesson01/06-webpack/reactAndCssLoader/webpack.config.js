module.exports = {
  entry: __dirname +"/app/main.js",//唯一的入口文件
  output:{
    path: __dirname +"/public",//打包后文件存放的目录
    filename:'bundle.js' //打包后输入的文件名
  },
  devServer:{
   contentBase: "./public",//本地服务器所加载的页面所在的目录
  //  colors: true,//终端中输出结果为彩色
   historyApiFallback: true,//不跳转
   inline: true//实时刷新
 },
 module:{
   loaders:[
   //babel配置
   {
     test:/\.js$/,
     exclude: /node_modules/,
    //  loader: 'babel',//webpack1的写法
     loader: 'babel-loader',//webpack2不支持缩写了
   },
   //新增加的配置
   {
        test: /\.css$/,
        // loader: 'style!css?modules'//添加对样式表的处理  webpack1的写法
        loader: 'style-loader!css-loader?modules'//添加对样式表的处理  webpack2不支编写
   }
 ]
 }
}
