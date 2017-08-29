// __dirname 就是 webpack.config 所在的目录
module.exports = {
  entry: __dirname +"/app/main.js",
  output:{
    path: __dirname +"/public/",
    filename:"bundle.js"
  },
  devServer:{
    contentBase:"./public",
    historyApiFallback:true,
    inline:true
  },
  module:{
    loaders:[
      {
        test:/\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      },
      {
         test: /\.(png|jpg)$/,
         loader: 'url-loader?limit=8192'
      }
    ]
  }
}
