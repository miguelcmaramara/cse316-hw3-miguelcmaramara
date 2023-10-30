const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/questions',
        createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        })
    );
    app.use(
        '/answers',
        createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        })
    );
    app.use(
        '/tags',
        createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        })
    );
    app.use(
        '/post/question',
        createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        })
    );
    app.use(
        '/post/answer',
        createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        })
    );
    app.use(
        '/post/answer',
        createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        })
    );
    app.use(
        '/addView/',
        createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        })
    );
    app.use(
        '/posts',
        createProxyMiddleware({
        target: 'http://localhost:8000',
        changeOrigin: true,
        })
    );

};