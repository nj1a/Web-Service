var http = require('http'),
    fs = require('fs');

http.createServer(function(req, res) {
    if (req.url === "/text-articles") {
        fs.readFile("../../nytimes.json", "utf8", function(err, data) {
            res.end(data);
        });
    }

}).listen(8080);

console.log('Server running at http://localhost:8080/');