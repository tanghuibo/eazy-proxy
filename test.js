const proxy = require('./libs/proxy');


proxy.createProxy({
    path: "/",
    port: 8081,
    target: "http://127.0.0.1:8080",
    proxyList: [
        {
            path: "/test/test1",
            response: {name: "test1"}
        },
        {
            path: "/test",
            response: {name: "test"}
        },
        {
            path: "/test/test2",
            response: {name: "test2"}
        }
    ]
})