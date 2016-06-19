class NytimesApi {
    getTextArticles() {
        $.ajax({
            url: "http:localhost:8080/text-articles",
            type: "GET",
            dataType: "json",  
        }).done(function(data, textStatus, jqXHR) {
            var $obj = data[0];
            for (var $key in $obj) {

                var $name = $("<h3/>", {
                    text: $key
                });
                $("#topthree").append($name);
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

