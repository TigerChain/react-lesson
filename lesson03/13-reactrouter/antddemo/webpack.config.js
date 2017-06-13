module.exports = {
  entry:  __dirname + "/src/js/index.js",
  output: {
    path: __dirname + "/src/",  //打包后文件地址
    publicPath:"/src/",   //命令行模式下,一定要配置output.publicPath来指定编译后的包(bundle)的访问位置.
  filename: "bundle.js"  //打包后文件
  },
  module: {
    loaders: [
      //babel配置
    {
      test:/\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },

  {
         test: /\.(png|jpg)$/,
         loader: 'url-loader?limit=8192'
  },
  {
    test: /\.css$/,
    loader: 'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!',
    exclude: /node_modules/

},
  {
  test: /\.css$/,
  loader: 'style-loader!css-loader'
},
 {test:/\.(png|jpg)$/,loader:"url-loader?limit=8192&name=img/[name][hash:8].[ext]"}

    ]
  },

  devServer:{
    // contentBase: "./dist",//本地服务器所加载的页面所在的目录
    // colors: true,//终端中输出结果为彩色
    hot:true,
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  }
}
