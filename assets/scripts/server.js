// import core library and the JSON file to be read
var http = require('http'),
    nytObj = require('../../nytimes.json');

// use only the result section of the file
var resultsObj = nytObj[0].results;

// initialize an http server to connect to clients
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
    
    // for now all the methods are GET methods
    if (req.method === 'GET') {
        if (req.url === '/text-articles') {
            var results = [];

            for (var i = 0; i < resultsObj.length; i++) {
                // add title, abstract, published date and short url
                results.push({title: resultsObj[i].title, 
                              abstract: resultsObj[i].abstract,
                              published_date: resultsObj[i].published_date,
                              short_url: resultsObj[i].short_url});
            }
            // send JSON as string
            res.end(JSON.stringify(results)); 

        } else if (req.url === '/authors') {
            var results = [];

            for (var i = 0; i < resultsObj.length; i++) {
                // add author name without the By part
                results.push({author: resultsObj[i].byline.slice(3)});
            }
            res.end(JSON.stringify(results)); 

        } else if (req.url === '/urls') {
            var temp = [], results = [];

            for (var i = 0; i < resultsObj.length; i++) {
                // add all published date and short url
                results.push({published_date: resultsObj[i].published_date,
                              short_url: resultsObj[i].short_url});
            }
            res.end(JSON.stringify(results));

        } else if (req.url === '/tags') {
            var results = [];

            for (var i = 0; i < resultsObj.length; i++) {
                // add all the tags
                results.push({des_facet: resultsObj[i].des_facet});
            }
            res.end(JSON.stringify(results));

        } else if (req.url.slice(0, 9) === '/articles') {
            var result = [], 
                idx = parseInt(req.url.slice(10));

            // only send when the article index is valid
            if (idx < resultsObj.length) {
                var article = resultsObj[idx];

                // add detailed info regarding the article
                result.push({section: article.section,
                            subsection: article.subsection,
                            title: article.title,
                            abstract: article.abstract,
                            byline: article.byline,
                            published_date: article.published_date,
                            des_facet: article.des_facet});

                res.end(JSON.stringify(result));
            } else { // send an empty JSON 
                res.end(JSON.stringify(result));
            }

        } else if (req.url === '/media-articles') {
            var results = [];
            
            for (var i = 0; i < resultsObj.length; i++) {
                var media = resultsObj[i].multimedia;

                // add one media at random and short url
                if (media.length > 0) {
                    var idx = Math.floor(Math.random() * media.length);
                    results.push({multimedia : media[idx],
                                  short_url: resultsObj[i].short_url});
                } else { // add the article title instead
                    results.push({title: resultsObj[i].title,
                                  short_url: resultsObj[i].short_url});
                }
            }
            res.end(JSON.stringify(results));
        }
    } else { // send page not found status
        res.statusCode = 404;
        res.end();
    }

}).listen(8080); // listen on port 8080