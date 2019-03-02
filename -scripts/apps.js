$(document).ready(function () {

    $("#appsBackgroundOneVisible").show();
    $("#appsBackgroundOneHidden").hide();

    $("#appsBackgroundOneVisible").click(function() {
        if ($("#appsBackgroundOneHidden").is(":hidden")) {
            $("#appsBackgroundOneVisible").hide();
            $("#appsBackgroundOneHidden").show();
        } else {
            $("#appsBackgroundOneVisible").show();
            $("#appsBackgroundOneHidden").hide();
        }
    });

    $("#appsBackgroundOneHidden").click(function() {
        if ($("#appsBackgroundOneVisible").is(":hidden")) {
            $("#appsBackgroundOneHidden").hide();
            $("#appsBackgroundOneVisible").show();
        } else {
            $("#appsBackgroundOneHidden").show();
            $("#appsBackgroundOneVisible").hide();
        }
    });

});