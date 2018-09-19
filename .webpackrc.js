const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  externals: {
    '@antv/data-set': 'DataSet',
    rollbar: 'rollbar',
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  proxy: {
    '/': {
      // target: 'http://192.168.10.173:8765/api/GbManager_shenwei/GbManager',
      // target: 'http://192.168.10.173:8765/api/GbManager/GbManager',
      target: 'http://192.168.10.173:8765/api/GbManager_wlj/GbManager',
      changeOrigin: true,
      pathRewrite: { '^/': '' },
    },
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};

//  "target": "http://192.168.10.102:8765/api/gbManager_liujianshi/GbManager",
