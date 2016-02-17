var http = require('http');


function callback (req, res) {
    
    
    //console.log(" OMG IK HEB EEN BERICHTJE WHOOP WHOOP!");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
    
    
    
}

http.createServer(callback).listen(8080);