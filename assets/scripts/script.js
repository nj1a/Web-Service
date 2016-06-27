var loggedIn = 0;
// this class implements ajax methods used to initiate HTTP requests to retrive
// information from a node.js server
class NytimesApi {
    
    getTextArticles() {
        $.ajax({
            url: "/text-articles",
            type: "GET",
            dataType: "json",  
        }).done(function(data, textStatus, jqXHR) {
            // append all titles, abstracts, published dates, and short urls
            for (var i = 0; i < data.length; i++) {
                var $article = $("<article/>")
                .appendTo("#display");

                var $title = $("<h3/>")
                .text("Title: " + data[i].title)
                .appendTo($article);

                var $abstract = $("<h3/>")
                .text("Abstract: " + data[i].abstract)
                .appendTo($article);

                var $publishedDate = $("<h3/>")
                .text("Published Date: " + data[i].published_date.slice(0, 10))
                .appendTo($article);

                var $snf = $("<h3/>")
                .text("snf: " + data[i].short_url)
                .appendTo($article);
            }

        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Request failed: " + textStatus + " " + errorThrown);
        });
    }

    getAuthors() {
        $.ajax({
            url: "/authors",
            type: "GET",
            dataType: "json",  
        }).done(function(data, textStatus, jqXHR) {
            var $article = $("<article/>")
            .appendTo("#display");

            $("<h2/>")
            .text("List of Authors:")
            .appendTo($article);

            var $authors = $("<ul/>").appendTo($article);

            // append all authors
            for (var i = 0; i < data.length; i++) {
                $("<li/>")
                .text(data[i].author)
                .appendTo($article);

            }

        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Request failed: " + textStatus + " " + errorThrown);
        });
    }

    getURLs() {
        $.ajax({
            url: "/urls",
            type: "GET",
            dataType: "json",  
        }).done(function(data, textStatus, jqXHR) {
            for (var i = 0; i < data.length; i++) {
                var $article = $("<article/>")
                .appendTo("#display");

                // append one published date
                var $publishedDate = $("<h3/>")
                .text("Published Date: " + data[i].published_date.slice(0, 10))
                .appendTo($article);

                // append all shorts urls as links with this published date
                var urls = data[i].short_urls;
                for (var j = 0; j < urls.length; j++) {
                    $("<a/>")
                    .text(urls[j])
                    .attr("href", urls[j])
                    .appendTo($article);
                }
            }

        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Request failed: " + textStatus + " " + errorThrown);
        });
    }

    getTags() {
        $.ajax({
            url: "/tags",
            type: "GET",
            dataType: "json",  
        }).done(function(data, textStatus, jqXHR) {
            var tags = [], stats = {}, uniqueTags;

            // put all tags into an array
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].des_facet.length; j++) {
                    tags.push(data[i].des_facet[j]); 
                }
            }

            // initialize the tag cloud and append a unordered list
            var $article = $("<article/>")
            .attr("id", "tagCloud")
            .appendTo("#display");
            $("<ul/>").attr("id", "tagList").appendTo("#tagCloud");

            // calculate tag frequency
            $.each(tags, function(idx, tag) {
                stats[tag] = stats.hasOwnProperty(tag) ? stats[tag] + 1 : 1;
            });

            // reduce to an array containing unique tags
            uniqueTags = Array.from(new Set(tags));
            
            $.each(uniqueTags, function(idx, tag) {
                // create and append tag to the list
                var $li = $("<li/>")
                .text(tag)
                .appendTo("#tagList");

                // give tags different font sizes depending on their frequency
                $li.css("font-size",
                (stats[tag] / 7 < 1) ? 
                    stats[tag] / 7 +0.5 + "em": (stats[tag] / 7 > 2) ? 
                        "2em" : stats[tag] / 7 + "em");
            });

        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Request failed: " + textStatus + " " + errorThrown);
        });
    }

    getArticle(idx) {
        $.ajax({
            url: "/articles/" + idx,
            type: "GET",
            dataType: "json",  
        }).done(function(data, textStatus, jqXHR) {
            // get an article by index with detailed information
            var data = data[0];

            if (data != null) {
                var $article = $("<article/>")
                .appendTo("#display");

                var $section = $("<h3/>")
                .text("Section: " + data.section)
                .appendTo($article);

                var $subsection = $("<h3/>")
                .text("Subsection: " + data.subsection)
                .appendTo($article);

                var $title = $("<h3/>")
                .text("Title: " + data.title)
                .appendTo($article);

                var $abstract = $("<h3/>")
                .text("Abstract: " + data.abstract)
                .appendTo($article);

                var $byline = $("<h3/>")
                .text("Byline: " + data.byline)
                .appendTo($article);

                var $publishedDate = $("<h3/>")
                .text("Published Date: " + data.published_date.slice(0, 10))
                .appendTo($article);

                var $tag = $("<h3/>")
                .text("Tag: " + data.des_facet)
                .appendTo($article);
                
            } else {
                alert("Not valid index. Try another number!");
            }

        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Request failed: " + textStatus + " " + errorThrown);
        });
    }

    getMediaArticles() {
        $.ajax({
            url: "/media-articles",
            type: "GET",
            dataType: "json",  
        }).done(function(data, textStatus, jqXHR) {
            var element;

            for (var i = 0; i < data.length; i++) {
                var $article = $("<article/>")
                .appendTo("#display");

                // media is not empty and an hyperlinked image or a video is 
                // displayed
                if (data[i].multimedia) {
                    var $link = $("<a/>")
                    .attr("href", data[i].short_url)
                    .appendTo($article);

                    var $media = $("<img/>")
                    .attr({"src": data[i].multimedia.url,
                           "alt": data[i].multimedia.caption,
                           "width": data[i].multimedia.width,
                           "height": data[i].multimedia.height})
                    .appendTo($link);
                } else { // article's title as placeholder
                    var $media = $("<a/>")
                    .text(data[i].title)
                    .attr("href", data[i].short_url)
                    .appendTo($article);
                }
            }
            
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Request failed: " + textStatus + " " + errorThrown);
        });
    }

    login() {
        $.ajax({
            url: "/",
            type: "POST",
            data: $("#modal form").serialize(),
        }).done(function(data, textStatus, jqXHR) {
            $("#u").val("");
            $("#p").val("");

            if (data == "Signed up" || data == "Logged in") {
                $("#modal").hide();
                $("#showForm").hide();
                $("#showFeedback").show();

                $("#snackbar")
                .text("You are now logged in")
                .addClass("show");


            } else {
                $("#snackbar")
                .text("Wrong password")
                .addClass("show");
            }

            setTimeout(function() { 
                $("#snackbar").removeClass("show"); 
            }, 3000);
            
        });
        event.preventDefault();
    }

    submitFeedback() {
        $.ajax({
            url: "/feedback",
            type: "POST",
            data: $("#modal2 form").serialize(),
        }).done(function(data, textStatus, jqXHR) {
            $("textarea").val("");

            $("#modal2").hide();

            $("#snackbar")
            .text("Thank you for your feedback")
            .addClass("show");
            
            setTimeout(function() { 
                $("#snackbar").removeClass("show"); 
            }, 3000);
            
        });
        event.preventDefault();        
    }
}

// attach ajax functions to each button
$(document).ready(function() {
    $("#showForm").click(function() {
        $("#modal").show();
    });

    $("#hideForm").click(function() {
        $("#modal").hide();
    });

    $("#cancel").click(function() {
        $("#modal").hide();
    });

    // close the modal when users click anywhere but the modal
    $("body").click(function(event) {
        if (event.target.id == "modal") {
            $("#modal").hide();
        }

        if (event.target.id == "modal2") {
            $("#modal2").hide();
        }
    });

    $("#showFeedback").click(function() {
        $("#modal2").show();
    });


    $("#cancel2").click(function() {
        $("#modal2").hide();
    });

    // attach all api related onclick methods
    var nytimesApi = new NytimesApi();

    $("#modal form").submit(function(){
        nytimesApi.login();
    });

    $("#modal2 form").submit(function(){
        nytimesApi.submitFeedback();
    });

    $("#textArticles").click(function() {
        $("#display").empty();
        nytimesApi.getTextArticles();
    });

    $("#authors").click(function() {
        $("#display").empty();
        nytimesApi.getAuthors();
    });

    $("#urls").click(function() {
        $("#display").empty();
        nytimesApi.getURLs();
    });

    $("#tags").click(function() {
        $("#display").empty();
        nytimesApi.getTags();
    });

    $("#article").click(function() {
        $("#display").empty();
        var idx = $("#index").val();
        nytimesApi.getArticle(idx);
    });

    $("#mediaArticles").click(function() {
        $("#display").empty();
        nytimesApi.getMediaArticles();
    });
});

