$(document).ready(function () {

    $("#menu-open").click(function () {
        $("#main").toggleClass("main-noscroll");
        $("#menu").toggleClass("menu-hidden");
        $("#menu-close").show();
        $("#menu-open").hide();
    });
    
    $("#menu-close").click(function () {
        $("#main").toggleClass("main-noscroll");
        $("#menu").toggleClass("menu-hidden");
        $("#menu-close").hide();
        $("#menu-open").show();
    });

});