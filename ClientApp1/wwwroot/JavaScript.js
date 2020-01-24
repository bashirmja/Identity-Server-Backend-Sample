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
        setupLoginMenu();
        setupDomEvents();
    };

    function setupOidc() {
        userManager = new Oidc.UserManager({
            authority: "https://localhost:44361",
            client_id: "js",
            popup_redirect_uri : "https://localhost:44336/callback-signin.html",
            response_type: "code",
            scope: "openid profile customAPI.read",
            post_logout_redirect_uri: "https://localhost:44336/callback-signout.html",
            automaticSilentRenew: true,
            silent_redirect_uri: 'http://localhost:4200/silent-refresh.html',
            popupWindowFeatures: 'location=no,menubar=no,resizable=no,toolbar=no,scrollbars=no,status=no,titlebar=no,width=500,height=550,left=100,top=100',
        });

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
            setupLoginMenu();
        });
        userManager.events.addSilentRenewError(function () {
            console.log("* silentRenewError Event");
        });
        userManager.events.addUserSignedOut(function () {
            console.log("* userSignedOut Event");
            userManager.removeUser();
        });

        Oidc.Log.logger = console;
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
            userManager.signinPopup();
        });

        $("#logoutmenu").click(function () {
            userManager.signoutPopup();
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

        if (autorized != null) {
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