$(document).ready(function() {
    $.ajax({
        url: "http:localhost:8080/",
        type: "GET",
        dataType: "json",  
    }).done(function(data, textStatus, jqXHR) {
        var $obj = data[0];
        for (var $key in $obj) {

            $name = $("<h3/>", {
                text: $key
            });
            $("#topthree").append($name);
        }

    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Request failed: " + textStatus + " " + errorThrown);
    });
});