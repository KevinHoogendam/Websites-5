var http = require('http');
var url = require('url');

function callback (req, res) {
    
    var urlPath = url.parse(req.url, true).path;
    console.log(urlPath);
    
    if(urlPath == '/add/:a/:b')
    {
        req.params.a
        req.params.b
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('5');
    }
    else
    {
        res.writeHead(404, {'Kapot': 'text/plain'});
        res.end('failed');
    } 
}

http.createServer(callback).listen(8080);