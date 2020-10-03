const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  //App entry
  entry: './src/js/index.js',
  output: {
    // webpack outPut files 文件导出路径
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js', // string
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({ template: resolve(__dirname, 'src/index.html') }),
  ],
  devServer: {
    contentBase: './',
    open: true,
  },
}
