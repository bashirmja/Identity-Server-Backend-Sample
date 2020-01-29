$(document).ready(function () {
    myApp().initializePage();
});

var myApp = function () {

    return {
        initializePage: init,
    };

    var userManager = null;

    function init() {
        setupOidc();
        assignOidcEvents();
        setupLoginMenu();
        assignDomEvents();
    };

    function setupOidc() {
        userManager = new Oidc.UserManager({
            authority: "https://localhost:44361",
            client_id: "jsClient",
            popup_redirect_uri: "https://localhost:44370/callback-signin.html",
            response_type: "code",
            scope: "openid profile ApiScope",
            post_logout_redirect_uri: "https://localhost:44370/callback-signout.html",
            automaticSilentRenew: true,
            silent_redirect_uri: 'https://localhost:44370/callback-silent.html',
        });

        Oidc.Log.logger = console;
    }

    function assignOidcEvents() {
        userManager.events.addUserLoaded(function () {
            console.log("* userLoaded Event");
            setupLoginMenu();
        });
        userManager.events.addUserUnloaded(function () {
            console.log("* userUnloaded Event");
            setupLoginMenu();
        });
        userManager.events.addAccessTokenExpiring(function () {
            console.log("* accessTokenExpiring Event");
        });
        userManager.events.addAccessTokenExpired(function () {
            console.log("* accessTokenExpired Event");
        });
        userManager.events.addSilentRenewError(function () {
            console.log("* silentRenewError Event1");
        });
        userManager.events.addUserSignedOut(function () {
            console.log("* userSignedOut Event");
            userManager.removeUser();
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

    function assignDomEvents() {
        $("#loginmenu").click(function () {
            userManager.signinPopup();
        });

        $("#logoutmenu").click(function () {
            userManager.signoutPopup();
        });

        $("#api").click(function () {
            apiRequestHandler("https://localhost:44316/weatherforecast", "#result")
        });

        $("#apibyid").click(function () {
            apiAutorizedRequestHandler("https://localhost:44316/weatherforecast/1", "#result")
        });
    };

    function apiAutorizedRequestHandler(url, resultTag) {
        $(resultTag).text("");
        userManager.getUser().then(function (user) {
            if (user) {
                ajaxCall(url, user.access_token).then(function (data) {
                    $(resultTag).text(data)
                });
            } else {
                $(resultTag).text("Access Denaid!")
            }
        });
    }

    function apiRequestHandler(url, resultTag) {
        $(resultTag).text("");
        ajaxCall(url).then(function (data) {
            $(resultTag).text(data)
        });
    }

    function ajaxCall(targetUrl, userToken) {
        return $.ajax({
            url: targetUrl,
            beforeSend: function (xhr) {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
                if (userToken != null) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + userToken);
                }
            }
        });
    }
};