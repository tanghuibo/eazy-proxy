const Proxy = require('../libs/proxy');

let proxy = new Proxy();


proxy.createProxy({
    path: "/",
    port: 8081,
    option: {
        target: "http://127.0.0.1:8080"
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

setTimeout(() => {
    proxy.createProxy({
        path: "/",
        port: 8081,
        option: {
            target: "http://127.0.0.1:8080"
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
    })
}, 10000);