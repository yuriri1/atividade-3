const httpProxy = require('express-http-proxy');
const express = require('express');
const app = express();
var logger = require('morgan');


app.use(logger('dev'));

function selectProxyHost(req) {
    if (req.path.startWith('/usuarios')) return 'http://localhost:8010/'
    else if (req.path.startWith('/salas')) return 'http://localhost:8020/'
    else if (req.path.startWith('/registro')) return 'http://localhost:8030/'
    else if (req.path.startWith('/liberacao')) return 'http://localhost:8040/'
    else if (req.path.startWith('/controle')) return 'http://localhost:8050/'
    else return null    
}

app.use((req, res, next) => {
    var proxyHost = selectProxyHost(req);
    if (proxyHost == null)
        res.status(404).send('Not found');
    else
        httpProxy(proxyHost)(req, res, next);
});

app.listen(8000, () => {
    console.log('API Gateway iniciado!');
});