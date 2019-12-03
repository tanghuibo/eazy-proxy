const Proxy = require('../libs/proxy');

let proxy = new Proxy();


proxy.createProxy({
    path: "/",
    port: 3001,
    option: {
        target: "http://127.0.0.1:3000"
    },
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
});
