$(document).ready(function () {

    $("#appsBackgroundOneVisible").show();
    $("#appsBackgroundOneHidden").hide();

    $("#appsBackgroundOneVisible").click(function() {
        $("#appsBackgroundOneVisible").toggle();
        $("#appsBackgroundOneHidden").toggle();
    });

    $("#appsBackgroundOneHidden").click(function() {
        $("#appsBackgroundOneVisible").toggle();
        $("#appsBackgroundOneHidden").toggle();
    });

});