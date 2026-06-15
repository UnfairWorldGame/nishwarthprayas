const { createProxyMiddleware } = require("http-proxy-middleware");

const API_TARGET =
  process.env.REACT_APP_PROXY_TARGET || "https://nishwarthprayas.onrender.com";

module.exports = function (app) {
  app.use(
    ["/images", "/upload", "/uploads", "/donate"],
    createProxyMiddleware({
      target: API_TARGET,
      changeOrigin: true,
      secure: true,
      logLevel: "warn",
    })
  );
};
