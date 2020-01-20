$(document).ready(function () {
    $("#search").click(function () {
        $("#result").text("");
        $.ajax({
            url: "https://localhost:44316/weatherforecast",
            beforeSend: function (xhr) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            }
        }).done(function (data) {

            $("#result").text(data);
        });
    });

    $("#searchbyid").click(function () {
        $("#result").text("");
        $.ajax({
            url: "https://localhost:44316/weatherforecast/1",
            beforeSend: function (xhr) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
            }
        }).done(function (data) {

            $("#result").text(data);
        });
    });
});