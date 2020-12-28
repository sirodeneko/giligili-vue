
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? '//cnd-giligili.xiaosiro.cn/' : '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};