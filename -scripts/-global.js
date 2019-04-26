$(document).ready(function () {

    $("#menu-open").click(function () {
        $("main").toggleClass("hide");
        $("nav").toggleClass("show");
        $("#menu-close").show();
        $("#menu-open").hide();
    });
    
    $("#menu-close").click(function () {
        $("main").toggleClass("hide");
        $("nav").toggleClass("show");
        $("#menu-close").hide();
        $("#menu-open").show();
    });

});