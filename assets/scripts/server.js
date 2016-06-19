var http = require('http'),
    fs = require('fs'),
    nytObj = require('../../nytimes.json');

var resultsObj = nytObj[0].results;

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
            var results = [];
            for (var i = 0; i < 10; i++) {
                results.push({"title": resultsObj[i].title, 
                              "abstract": resultsObj[i].abstract,
                              "published_date": resultsObj[i].published_date,
                              "short_url": resultsObj[i].short_url});
            }
            res.end(JSON.stringify(results)); 
        } 
    } else { // return page not found status
        res.statusCode = 404;
        res.end();
    }

}).listen(8080);

console.log('Server running at http://localhost:8080/');