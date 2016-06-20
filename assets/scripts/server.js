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
            for (var i = 0; i < resultsObj.length; i++) {
                console.log(resultsObj[i].title);
                results.push({title: resultsObj[i].title, 
                              abstract: resultsObj[i].abstract,
                              published_date: resultsObj[i].published_date,
                              short_url: resultsObj[i].short_url});
            }
            res.end(JSON.stringify(results)); 
        } else if (req.url === '/authors') {
            var results = [];
            for (var i = 0; i < resultsObj.length; i++) {
                results.push({author: resultsObj[i].byline.slice(3)});
            }
            res.end(JSON.stringify(results)); 
        } else if (req.url === '/urls') {
            var temp = [];
            var results = [];
            for (var i = 0; i < resultsObj.length; i++) {
                results.push({published_date: resultsObj[i].published_date,
                              short_url: resultsObj[i].short_url});
            }
            res.end(JSON.stringify(results)); 
        } else if (req.url === '/tags') {
            var results = [];
            for (var i = 0; i < resultsObj.length; i++) {
                console.log(resultsObj[i].des_facet);
                results.push({des_facet: resultsObj[i].des_facet});
            }
            res.end(JSON.stringify(results)); 
        } else if (req.url.slice(0, 9) === '/articles') {
            var result = [];
            var idx = parseInt(req.url.slice(10));
            if (idx < resultsObj.length) {
                var article = resultsObj[idx];

                result.push({section: article.section,
                            subsection: article.subsection,
                            title: article.title,
                            abstract: article.abstract,
                            byline: article.byline,
                            published_date: article.published_date,
                            des_facet: article.des_facet});

                res.end(JSON.stringify(result));
            }
        } else if (req.url === '/media-articles') {
            var results = [];
            for (var i = 0; i < resultsObj.length; i++) {
                var media = resultsObj[i].multimedia;
                if (media.length > 0) {
                    var idx = Math.floor(Math.random() * media.length);
                    results.push({multimedia : media[idx],
                                  short_url: resultsObj[i].short_url});
                } else {
                    results.push({title: resultsObj[i].title,
                                  short_url: resultsObj[i].short_url});
                }
            }
            res.end(JSON.stringify(results));
        }
    } else { // return page not found status
        res.statusCode = 404;
        res.end();
    }

}).listen(8080);

console.log('Server running at http://localhost:8080/');