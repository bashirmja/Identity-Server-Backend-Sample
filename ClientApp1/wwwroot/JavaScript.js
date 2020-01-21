$(document).ready(function () {

    var USERTOKEN = null;

    var config = {
        authority: "https://localhost:44361",
        client_id: "js",
        redirect_uri: "https://localhost:44336/callback.html",
        response_type: "code",
        scope: "openid profile customAPI.read",
        post_logout_redirect_uri: "https://localhost:44336/index.html",
    };
    var mgr = new Oidc.UserManager(config);

    mgr.getUser().then(function (user) {
        if (user) {
            $("#username").text(user.profile.nickname);
            $("#loginmenu").css('visibility', 'hidden');
            $("#logoutmenu").css('visibility', 'visible');
            USERTOKEN = user.access_token;
        }
        else {
            $("#username").text("");
            $("#loginmenu").css('visibility', 'visible');
            $("#logoutmenu").css('visibility', 'hidden');
            USERTOKEN = null;

        }
    });

    $("#loginmenu").click(function () {
        mgr.signinRedirect();
    });



    $("#logoutmenu").click(function () {
        mgr.signoutRedirect();
    });



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
                xhr.setRequestHeader('Authorization', 'Bearer' + USERTOKEN);
            }
        }).done(function (data) {

            $("#result").text(data);
        });
    });








});