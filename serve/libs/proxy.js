const express = require("express");
const proxy = require("http-proxy-middleware");
const gracefulExit = require("express-graceful-exit");

/**
 * 关闭并移除端口为 #{port} 的代理
 * @param {*} proxyList
 * @param {*} port
 */
function closeAndRemoveProxy(proxyList, port) {
  proxyList
    .filter(item => item.port == port)
    .forEach(item => {
      try {
        item.close();
      } catch (error) {
        console.error(error);
      }
    });
  return proxyList.filter(item => item.proxy != port);
}

/**
 * 设置返回体
 * @param {*} proxyList
 * @param {*} app
 */
function setResponse(proxyList, app) {
  if (proxyList != null && proxyList instanceof Array) {
    proxyList.forEach(({ path, response }) => {
      app.use(path, (req, res) => {
        res.send(response);
      });
    });
  }
}

/**
 * 关闭服务
 * @param {*} server 
 * @param {*} app 
 */
function closeServer(server, app) {
  gracefulExit.init(server);
  app.use(gracefulExit.middleware(app));
  gracefulExit.gracefulExitHandler(app, server, {
    exitProcess: false
  });
}

module.exports = class Proxy {
  constructor() {
    this.proxyList = [];
  }
  /**
   * 创建一个代理
   * @param {*} option
   */
  createProxy({ path, port, option, proxyList }) {
    let app = express();
    //关闭旧的端口占用
    this.proxyList = closeAndRemoveProxy(this.proxyList, port);
    //设置返回数据
    setResponse(proxyList, app);
    //设置代理地址
    app.use(path == null ? "/" : path, proxy(option));
    //开启代理
    let server = app.listen(port);
    //添加代理到服务列表
    this.addProxyList(server, app, port);
  }
  /**
   * 添加代理到服务列表
   * @param {*} server 
   * @param {*} app 
   * @param {*} port 
   */
  addProxyList(server, app, port) {
    this.proxyList.push({
      port,
      app,
      server,
      close: () => {
        closeServer(server, app);
      }
    });
  }
};


