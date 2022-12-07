const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://52.44.107.157:8080",
      changeOrigin: true,
    })
  );
};
