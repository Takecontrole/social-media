const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://social-media-api.adaptable.app',
      changeOrigin: true,
    })
  );
};
