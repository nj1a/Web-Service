var http = require('http'),
    fs = require('fs');

http.createServer(function(req, res) {
    fs.readFile("../../nytimes.json", "utf8", function(err, data) {
        res.end(data);
    });
}).listen(8080);

console.log('Server running at http://localhost:8080/');