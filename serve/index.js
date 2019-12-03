const express = require("express");
const Proxy = require('./libs/proxy');
const bodyParser = require("body-parser");

let proxy = new Proxy();

let app = express();

// 使用 body-parser 中间
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/list', (req, res) => {
    res.json({
        "name": "123"
    })
})

app.post('/add', (req, res) => {
    console.log(req.body);
    res.json(req.body)
})


app.listen(3002)