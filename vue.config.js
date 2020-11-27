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
            '/static':{
              target: 'http://10.1.100.52:8089',
              changeOrigin: true,
              ws: true, 
              pathRewrite: {
                '^/static': ''
              }
            },
            '/windy':{
              target: 'http://localhost:9010',
              changeOrigin: true,
              ws: true, 
              pathRewrite: {
                '^/windy': ''
              }
            },
          },
    },
};
