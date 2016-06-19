class REST {
    allArticles() {
        $.ajax({
            url: "http:localhost:8080/",
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
}


$(document).ready(function() {
    var r = new REST();

    $("#find").click(function() {
        r.allArticles();
    });
});

