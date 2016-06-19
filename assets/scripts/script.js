class NytimesApi {
    getTextArticles() {
        $.ajax({
            url: "http:localhost:8080/text-articles",
            type: "GET",
            dataType: "json",  
        }).done(function(data, textStatus, jqXHR) {
            for (var i = 0; i < 10; i++) {
                var $title = $("<h3/>")
                .text("Title: " + data[i].title)
                .appendTo("#display");

                var $abstract = $("<h3/>")
                .text("Abstract: " + data[i].abstract)
                .appendTo("#display");

                var $publishedDate = $("<h3/>")
                .text("Published Date: " + data[i].published_date.slice(0, 10))
                .appendTo("#display");

                var $snf = $("<h3/>")
                .text("snf: " + data[i].short_url)
                .appendTo("#display");
            }

        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Request failed: " + textStatus + " " + errorThrown);
        });
    }

    getAuthors() {

    }

    getTags() {

    }

    getArticle() {

    }

    getMediaArticles() {

    }
}


$(document).ready(function() {
    var nytimesApi = new NytimesApi();

    $("#find").click(function() {
        nytimesApi.getTextArticles();
    });
});

