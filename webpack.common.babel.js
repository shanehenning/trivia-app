import { resolve } from 'path'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import WebpackBar from 'webpackbar'
import * as webpack from 'webpack'

const isDevelopment = process.env.NODE_ENV !== 'production'

const config = {
  entry: {
    main: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.js'],
  },
  mode: isDevelopment ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(giv|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: !isDevelopment,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.(js|jsx)$/,
      },
      {
        include: /node_modules/,
        test: /\.(js|jsx)$/,
        use: 'react-hot-loader/webpack',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
        test: /\.module\.s(a|c)ss$/,
      },
      {
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
        test: /\.s(a|c)ss$/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: !isDevelopment },
          },
        ],
      },
    ],
  },

  output: {
    chunkFilename: isDevelopment ? '[name].[hash].js' : '[id].[chunkhash].js',
    filename: isDevelopment ? '[name].[hash].js' : '[id].[chunkhash].js',
    path: `${__dirname}/dist/${process.env.BUILD_TYPE}`,
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.BUILD_TYPE': JSON.stringify(
        process.env.BUILD_TYPE || '-np-dev',
      ),
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development',
      ),
    }),
    new HtmlWebPackPlugin({
      chunks: ['main'],
      filename: './index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
    }),
    // new CopyWebpackPlugin([{ from: './public' }]),
    new WebpackBar(),
  ],
  resolve: {
    alias: {
      api: resolve(__dirname, './src/api'),
      components: resolve(__dirname, './src/components'),
      config: resolve(__dirname, './src/config'),
      lib: resolve(__dirname, './src/lib'),
      src: resolve(__dirname, './src'),
      store: resolve(__dirname, './src/store'),
      utils: resolve(__dirname, './src/utils'),
    },
    extensions: [
      '.js',
      '.jsx',
      '.scss',
      '.gif',
      '.png',
      '.jpg',
      '.jpeg',
      '.svg',
    ],
  },
  stats: {
    colors: true,
  },
}

if (process.env.ANALYZE === 'true') {
  config.plugins.unshift(new BundleAnalyzerPlugin())
}

export default config
