const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
var ZipPlugin = require('zip-webpack-plugin');

console.log("running terser adjusted webpack");

module.exports = {
  entry: './AdminControl.ts',
  mode: 'production',
  
  plugins: [
    new CopyPlugin({
      patterns:[
        {
        from: "AdminControl.json", to:"AdminControl.json"
        }
      ]
    }),

    new ZipPlugin({
      filename: 'AdminControl.js'
    })
  ],


  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
          keep_classnames: true,
          compress: false,
          mangle: false,
          output:{
            beautify:true
          }
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  target: ['web'],
  output: {
    filename: 'AdminControl.js',
    path: path.resolve(__dirname, 'dist'),
  },

  
};