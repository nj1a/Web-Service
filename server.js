var http = require('http'),
    fs = require('fs');

var server = http.createServer(function(req, res) {
    fs.readFile("nytimes.json", "utf8", function(err, data) {
        console.log(data);
        res.end(data);
    });
});

server.listen(8080);
console.log('Server running at http://localhost:8080/');