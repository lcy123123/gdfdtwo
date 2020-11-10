const proxy = require('http-proxy-middleware');
module.exports = {
    devServer: {
        disableHostCheck: false,
        host: "localhost",
        port: 8080,
        https: false,
        hotOnly: false,
        // 代理
        proxy: {
            '/api':{
              target: 'http://10.1.100.52:8088',
              changeOrigin: true,
              ws: true, 
              pathRewrite: {
                '^/api': ''
              }
            },
          },
    },
};
