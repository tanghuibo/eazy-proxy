const express = require("express");
const proxy = require("http-proxy-middleware");
const gracefulExit = require("express-graceful-exit");

/**
 *
 * @param {*} option
 */
function createProxy({ path, port, target, proxyList }) {
  let app = express();
  //设置返回数据
  if (proxyList != null && proxyList instanceof Array) {
    proxyList.forEach(({ path, response }) => {
      app.use(path, (req, res) => {
        res.send(response);
      });
    });
  }
  //设置代理地址
  app.use(
    path,
    proxy({
      target
    })
  );
  let server = app.listen(port);
  gracefulExit.init(server);
  app.use(gracefulExit.middleware(app));
  return {
    close: () => {
      gracefulExit.gracefulExitHandler(app, server, {
        exitProcess: false
      });
      console.log("close");
    }
  };
}

module.exports = {
  createProxy
};
