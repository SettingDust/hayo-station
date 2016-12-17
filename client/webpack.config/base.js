const path = require('path')

const root = path.resolve(__dirname, '../')

module.exports = {
  entry: [path.join(root, 'src/index.js')],
  output: {
    path: path.join(root, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      components: path.join(root, 'src/components'),
      containers: path.join(root, 'src/containers'),
      styles: path.join(root, 'src/styles'),
      routes: path.join(root, 'src/routes'),
      store: path.join(root, 'src/store'),
      apis: path.join(root, 'src/apis')
    },
    extensions: ['', '.js', '.jsx'],
    fallback: path.join(root, 'node_modules')
  },
  resolveLoader: {
    fallback: path.join(root, 'node_modules')
  },
  module: {
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint', include: path.join(root, 'src'), exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.styl$/, loader: 'style!css!stylus'}
    ]
  }
}
