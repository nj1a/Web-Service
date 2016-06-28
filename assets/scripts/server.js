// import core library and the JSON file to be read
var http = require('http'),
    fs = require('fs'),
    qs = require('querystring');
    nytObj = require('../../nytimes.json');
    
// use only the result section of the file
var resultsObj = nytObj[0].results;

var usernames = [], passwords = [], feedbacks = [];

// source: http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function() {
	var hash = 0;
	if (this.length == 0) {
        return hash;
    }

	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

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
        if (req.url === '/') {
            fs.readFile('../../a3.html', function(err, data) {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(data);
            });
        } else if (req.url === '/style.css') {
            fs.readFile('../styles/style.css', function(err, data) {
                res.writeHead(200, {"Content-Type": "text/css"});
                res.end(data);
            });
        } else if (req.url === '/jquery-3.0.0.js') {
            fs.readFile('./jquery-3.0.0.js', function(err, data) {
                res.writeHead(200, {"Content-Type": "application/javascript"});
                res.end(data);
            });
        } else if (req.url === '/script.js') {
            fs.readFile('./script.js', function(err, data) {
                res.writeHead(200, {"Content-Type": "application/javascript"});
                res.end(data);
            });
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});

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
                    var name = resultsObj[i].byline.slice(3);

                    // convert names to first letter capital and rest lowercase
                    name = name.replace(/\w\S*/g, function(txt) {
                        return txt.charAt(0).toUpperCase() + 
                                txt.substr(1).toLowerCase();
                    });

                    results.push({author: name});
                }
                res.end(JSON.stringify(results)); 

            } else if (req.url === '/urls') {
                var results = [];

                for (var i = 0; i < resultsObj.length; i++) {
                    // add all published date and short url
                    results.push({published_date: resultsObj[i].published_date,
                                short_url: resultsObj[i].short_url});
                }

                // group short urls by common published dates
                var newArray = [], publishedDates = {}, newItem, cur;
                for (var i = 0; i < results.length; i++) {
                    cur = results[i];
                    if (!(cur.published_date in publishedDates)) {
                        publishedDates[cur.published_date] = 
                                {published_date: cur.published_date, 
                                 short_urls: []};
                        newArray.push(publishedDates[cur.published_date]);
                    }
                    publishedDates[cur.published_date].short_urls.
                                                    push(cur.short_url);
                }

                res.end(JSON.stringify(newArray));

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
                if (idx < resultsObj.length && idx >= 0) {
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
        }
    } else if (req.method == 'POST') {
        if (req.url == '/') {
            var body = '';

            req.on('data', function(data) {
                body += data;
                if (body.length > 1e6) {
                    req.connection.destroy();
                }
                    
            }).on('end', function() {
                var post = qs.parse(body);
                var idx = usernames.indexOf(post.uname);
                var hashedPassword = post.pwd.hashCode();

                if (idx != -1) {
                    if (passwords[idx] != hashedPassword) { // check password
                        res.end("Wrong password");
                    } else {
                        res.end("Logged in");
                    }
                } else { // username does not exist
                    usernames.push(post.uname);
                    passwords.push(hashedPassword);
                    res.end("Signed up");
                }

            });
        } else if (req.url == '/feedback') {
            var body = '';

            req.on('data', function(data) {
                body += data;
                if (body.length > 1e6) {
                    req.connection.destroy();
                }
                    
            }).on('end', function() {
                var post = qs.parse(body);
                feedbacks.push(post.fb);
                res.end();
            });
        }

    }

}).listen(8080); // listen on port 8080