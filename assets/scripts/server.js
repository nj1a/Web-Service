var http = require('http'),
    fs = require('fs');

http.createServer(function(req, res) {
    // handle errors on the request end
    req.on('error', function(err) {
        console.error(err);
        res.statusCode = 400;
        res.end();
    });

    // handle errors on the ressponse end
    res.on('error', function(err) {
        console.error(err);
    });
    
    if (req.method === 'GET') {
        if (req.url === '/text-articles') {
            fs.readFile('../../nytimes.json', 'utf8', function(err, data) {
                res.end(data);
            });
        } 
    } else { // return page not found status
        response.statusCode = 404;
        response.end();
    }

}).listen(8080);

console.log('Server running at http://localhost:8080/');