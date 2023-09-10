import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://www.okdkbackend.shop/",
      changeOrigin: true,
    })
  );
}
