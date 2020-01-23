$(document).ready(function () {
    myApp().initializePage();
});

var myApp = function () {

    return {
        initializePage: init,
    };

    var userManager = null;

    function init() {
        setupIodc();
        setupLoginMenu();
        setupDomEvents();
    };

    function setupIodc() {
        userManager = new Oidc.UserManager({
            authority: "https://localhost:44361",
            client_id: "js",
            redirect_uri: "https://localhost:44336/callback.html",
            response_type: "code",
            scope: "openid profile customAPI.read",
            post_logout_redirect_uri: "https://localhost:44336/index.html",
        });
    }

    function setupLoginMenu() {
        userManager.getUser().then(function (user) {
            if (user) {
                $("#username").text(user.profile.nickname);
                $("#loginmenu").css('visibility', 'hidden');
                $("#logoutmenu").css('visibility', 'visible');
            }
            else {
                $("#username").text("");
                $("#loginmenu").css('visibility', 'visible');
                $("#logoutmenu").css('visibility', 'hidden');
            }
        });
    }

    function setupDomEvents() {
        $("#loginmenu").click(function () {
            userManager.signinRedirect();
        });

        $("#logoutmenu").click(function () {
            userManager.signoutRedirect();
        });

        $("#api").click(function () {
            apiRequestHandler("https://localhost:44316/weatherforecast", "#result")
        });

        $("#apibyid").click(function () {
            apiRequestHandler("https://localhost:44316/weatherforecast/1", "#result", true)
        });
    };

    function apiRequestHandler(url, element, autorized) {
        $(element).text("");

        if (autorized) {
            userManager.getUser().then(function (user) {
                if (user) {
                    ajaxCall(url, user.access_token)
                        .then(function (data) {
                            $(element).text(data)
                        });
                } else {
                    $(element).text("Access Denaid!")
                }
            });
        }
        else {
            ajaxCall(url)
                .then(function (data) {
                    $(element).text(data)
                });
        }
    }

    function ajaxCall(targetUrl, userToken) {
        return $.ajax({
            url: targetUrl,
            beforeSend: function (xhr) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
                xhr.setRequestHeader('Authorization', 'Bearer ' + userToken);
            }
        });
    }
};