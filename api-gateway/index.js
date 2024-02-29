const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const port = 9090;

app.use(
  "/products",
  createProxyMiddleware({
    target: "http://localhost:8080",
    changeOrigin: true,
    pathRewrite: {
      "^/products": "",
    },
  })
);

app.use(
    "/orders",
    createProxyMiddleware({
      target: "http://localhost:8081",
      changeOrigin: true,
      pathRewrite: {
        "^/orders": "",
      },
    })
  );

app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:8082",
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "",
    },
  })
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
